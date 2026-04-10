"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";

function readCookie(name: string): string | null {
	if (typeof document === "undefined") return null;
	const parts = document.cookie.split(";").map((p) => p.trim());
	for (const p of parts) {
		const idx = p.indexOf("=");
		if (idx === -1) continue;
		if (p.slice(0, idx) === name) return decodeURIComponent(p.slice(idx + 1));
	}
	return null;
}

interface VisitorSession {
	id: string;
	ip: string;
	userAgent: string;
	platform: string;
	timezone: string;
	loginAt: number;
	lastSeen: number;
	name?: string | null;
	role?: string | null;
	password?: string | null;
}

function formatDuration(ms: number): string {
	if (ms < 0) ms = 0;
	const totalSec = Math.floor(ms / 1000);
	const h = Math.floor(totalSec / 3600);
	const m = Math.floor((totalSec % 3600) / 60);
	const s = totalSec % 60;
	const parts: string[] = [];
	if (h) parts.push(`${h}h`);
	if (m) parts.push(`${m}m`);
	parts.push(`${s}s`);
	return parts.join(" ");
}

function formatInTimezone(epoch: number, tz: string): string {
	try {
		return new Intl.DateTimeFormat("en-GB", {
			year: "numeric",
			month: "short",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: true,
			timeZone: tz,
		}).format(new Date(epoch));
	} catch {
		return new Date(epoch).toISOString();
	}
}

export default function AdminVisitorsPage() {
	const router = useRouter();
	const [authorized, setAuthorized] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [sessions, setSessions] = useState<VisitorSession[]>([]);
	const [loading, setLoading] = useState(true);
	const [serverTime, setServerTime] = useState<number>(Date.now());
	const [now, setNow] = useState<number>(Date.now());

	/* Auth check — must have super-admin cookie (set only for BPJoel27) */
	useEffect(() => {
		if (readCookie("bp_super_admin") === "1") {
			setAuthorized(true);
		} else {
			router.replace("/tools");
		}
	}, [router]);

	const fetchVisitors = useCallback(
		async () => {
			setLoading(true);
			setError(null);
			try {
				const res = await fetch("/api/admin/visitors", {
					cache: "no-store",
					credentials: "same-origin",
				});
				if (res.status === 401) {
					setError("Unauthorized.");
					setAuthorized(false);
					return;
				}
				if (!res.ok) {
					setError("Failed to load visitors.");
					return;
				}
				const data = await res.json();
				setSessions(data.sessions ?? []);
				setServerTime(data.serverTime ?? Date.now());
			} catch {
				setError("Network error.");
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	useEffect(() => {
		if (!authorized) return;
		fetchVisitors();
		const interval = setInterval(() => fetchVisitors(), 5000);
		return () => clearInterval(interval);
	}, [authorized, fetchVisitors]);

	useEffect(() => {
		const t = setInterval(() => setNow(Date.now()), 1000);
		return () => clearInterval(t);
	}, []);

	if (!authorized) {
		return (
			<div className="min-h-screen bg-black flex items-center justify-center">
				<p className="text-white/50 text-sm">Redirecting...</p>
			</div>
		);
	}

	return (
		<AppShell>
			<div className="mb-6 flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-medium text-white">Live Visitors</h1>
					<p className="mt-1 text-sm text-white/60">
						{sessions.length} active {sessions.length === 1 ? "session" : "sessions"} · auto-refreshing every 5s
					</p>
				</div>
				<button
					onClick={() => fetchVisitors()}
					className="rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
				>
					Refresh
				</button>
			</div>

			{sessions.length === 0 ? (
				<div className="rounded-xl border border-white/10 bg-black/50 p-10 text-center text-white/60">
					No active visitors right now.
				</div>
			) : (
				<div className="grid gap-4">
					{sessions.map((s) => {
						const duration = now - s.loginAt;
						const isStale = now - s.lastSeen > 30_000;
						return (
							<div
								key={s.id}
								className="rounded-xl border border-white/10 bg-black/60 p-5 backdrop-blur-sm"
							>
								<div className="mb-3 flex flex-wrap items-center justify-between gap-3">
									<div className="flex items-center gap-3">
										<span
											className={`inline-block h-2.5 w-2.5 rounded-full ${
												isStale ? "bg-yellow-400" : "bg-green-400 animate-pulse"
											}`}
										/>
										<h3 className="text-lg font-medium text-white">
											{s.name ?? "Unknown visitor"}
										</h3>
										{s.role && (
											<span className="rounded-full border border-white/20 px-2 py-0.5 text-xs text-white/70">
												{s.role}
											</span>
										)}
									</div>
									<span className="text-xs text-white/50">Session {s.id.slice(0, 8)}</span>
								</div>

								<div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
									<Row label="Password used" value={s.password ?? "—"} mono />
									<Row label="IP address" value={s.ip} mono />
									<Row label="Platform" value={s.platform} />
									<Row label="Logged in for" value={formatDuration(duration)} />
									<Row
										label={`Login time (${s.timezone})`}
										value={formatInTimezone(s.loginAt, s.timezone)}
									/>
									<Row
										label="Login time (IST)"
										value={formatInTimezone(s.loginAt, "Asia/Kolkata")}
									/>
									<Row label="Timezone" value={s.timezone} />
									<Row
										label="Last activity"
										value={`${Math.max(0, Math.floor((now - s.lastSeen) / 1000))}s ago`}
									/>
									<Row label="User agent" value={s.userAgent} small />
								</div>
							</div>
						);
					})}
				</div>
			)}

			<p className="mt-6 text-center text-xs text-white/40">
				Server time: {new Date(serverTime).toLocaleString()}
			</p>
		</AppShell>
	);
}

function Row({
	label,
	value,
	mono = false,
	small = false,
}: {
	label: string;
	value: string;
	mono?: boolean;
	small?: boolean;
}) {
	return (
		<div className={small ? "sm:col-span-2 lg:col-span-3" : ""}>
			<div className="text-xs uppercase tracking-wide text-white/40">{label}</div>
			<div
				className={`mt-0.5 break-words text-white ${mono ? "font-mono" : ""} ${
					small ? "text-xs text-white/70" : ""
				}`}
			>
				{value}
			</div>
		</div>
	);
}
