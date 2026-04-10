"use client";

import { useCallback, useEffect, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";

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
	const [password, setPassword] = useState("");
	const [authed, setAuthed] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [sessions, setSessions] = useState<VisitorSession[]>([]);
	const [loading, setLoading] = useState(false);
	const [serverTime, setServerTime] = useState<number>(Date.now());
	const [now, setNow] = useState<number>(Date.now());

	const fetchVisitors = useCallback(
		async (pw: string) => {
			setLoading(true);
			setError(null);
			try {
				const res = await fetch("/api/admin/visitors", {
					headers: { "x-admin-password": pw },
					cache: "no-store",
				});
				if (res.status === 401) {
					setError("Invalid admin password.");
					setAuthed(false);
					return;
				}
				if (!res.ok) {
					setError("Failed to load visitors.");
					return;
				}
				const data = await res.json();
				setSessions(data.sessions ?? []);
				setServerTime(data.serverTime ?? Date.now());
				setAuthed(true);
			} catch {
				setError("Network error.");
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();
		fetchVisitors(password);
	};

	useEffect(() => {
		if (!authed) return;
		const interval = setInterval(() => fetchVisitors(password), 5000);
		return () => clearInterval(interval);
	}, [authed, password, fetchVisitors]);

	useEffect(() => {
		const t = setInterval(() => setNow(Date.now()), 1000);
		return () => clearInterval(t);
	}, []);

	if (!authed) {
		return (
			<AppShell>
				<div className="flex min-h-[60vh] items-center justify-center">
					<form
						onSubmit={handleLogin}
						className="w-full max-w-md rounded-2xl border border-white/20 bg-black/70 p-8 backdrop-blur-md"
					>
						<h1 className="mb-2 text-2xl font-medium text-white">Admin Access</h1>
						<p className="mb-6 text-sm text-white/60">
							Visitor monitor — restricted to super admin.
						</p>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Admin password"
							className="w-full rounded-lg border border-white/20 bg-black/40 px-4 py-3 text-white outline-none focus:border-white/50"
							autoFocus
						/>
						{error && (
							<p className="mt-3 text-sm text-red-400">{error}</p>
						)}
						<button
							type="submit"
							disabled={loading}
							className="mt-5 w-full rounded-lg bg-white px-4 py-3 font-medium text-black transition hover:bg-white/90 disabled:opacity-50"
						>
							{loading ? "Verifying..." : "Unlock"}
						</button>
					</form>
				</div>
			</AppShell>
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
					onClick={() => fetchVisitors(password)}
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
