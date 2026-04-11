"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

/* ── Types ─────────────────────────────────────────────── */

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

interface EndedSession extends VisitorSession {
	endedAt: number;
	duration: number;
	endedReason?: "logout" | "stale" | "manual";
}

/* ── Helpers ───────────────────────────────────────────── */

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

/** Returns YYYY-MM-DD for the given epoch in the viewer's local timezone. */
function toLocalDateKey(epoch: number): string {
	const d = new Date(epoch);
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	return `${y}-${m}-${day}`;
}

/* ── Page ──────────────────────────────────────────────── */

type Tab = "live" | "previous";
const ALL_PASSWORDS = "__all__";

// Fixed list of passwords shown in the filter dropdown — always available
// regardless of whether anyone has logged in with them yet.
const KNOWN_PASSWORDS = [
	"BPAnjali27",
	"BPInderjeet27",
	"BPKapil27",
	"BPZulfiqar27",
	"BPSparsh27",
	"BPYuri27",
	"BPScott27",
	"BPSam27",
	"BPInvestor27",
] as const;

export default function AdminSessionsPage() {
	const router = useRouter();
	const [authorized, setAuthorized] = useState(false);
	const [tab, setTab] = useState<Tab>("live");
	const [sessions, setSessions] = useState<VisitorSession[]>([]);
	const [history, setHistory] = useState<EndedSession[]>([]);
	const [serverTime, setServerTime] = useState<number>(Date.now());
	const [persistent, setPersistent] = useState<boolean>(false);
	const [now, setNow] = useState<number>(Date.now());
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Filters
	const [dateFilter, setDateFilter] = useState<string>(""); // YYYY-MM-DD or ""
	const [passwordFilter, setPasswordFilter] = useState<string>(ALL_PASSWORDS);

	/* Auth check — must have super-admin cookie */
	useEffect(() => {
		if (readCookie("bp_super_admin") === "1") {
			setAuthorized(true);
		} else {
			router.replace("/tools");
		}
	}, [router]);

	/* Fetch data */
	const fetchData = useCallback(async () => {
		try {
			const res = await fetch("/api/admin/visitors", {
				cache: "no-store",
				credentials: "same-origin",
			});
			if (!res.ok) {
				setError("Failed to load sessions.");
				return;
			}
			const data = await res.json();
			setSessions(data.sessions ?? []);
			setHistory(data.history ?? []);
			setServerTime(data.serverTime ?? Date.now());
			setPersistent(Boolean(data.persistent));
			setError(null);
		} catch {
			setError("Network error.");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (!authorized) return;
		fetchData();
		const interval = setInterval(fetchData, 5000);
		return () => clearInterval(interval);
	}, [authorized, fetchData]);

	/* Live clock */
	useEffect(() => {
		const t = setInterval(() => setNow(Date.now()), 1000);
		return () => clearInterval(t);
	}, []);

	/* Password filter options = fixed known list + anything new we've seen. */
	const passwordOptions = useMemo(() => {
		const set = new Set<string>(KNOWN_PASSWORDS);
		for (const s of sessions) if (s.password) set.add(s.password);
		for (const s of history) if (s.password) set.add(s.password);
		return Array.from(set).sort();
	}, [sessions, history]);

	/* Apply filters */
	const filteredSessions = useMemo(() => {
		return sessions.filter((s) => {
			if (dateFilter && toLocalDateKey(s.loginAt) !== dateFilter) return false;
			if (passwordFilter !== ALL_PASSWORDS && s.password !== passwordFilter) return false;
			return true;
		});
	}, [sessions, dateFilter, passwordFilter]);

	const filteredHistory = useMemo(() => {
		return history.filter((s) => {
			if (dateFilter && toLocalDateKey(s.loginAt) !== dateFilter) return false;
			if (passwordFilter !== ALL_PASSWORDS && s.password !== passwordFilter) return false;
			return true;
		});
	}, [history, dateFilter, passwordFilter]);

	const filtersActive = Boolean(dateFilter) || passwordFilter !== ALL_PASSWORDS;

	if (!authorized) {
		return (
			<div className="min-h-screen bg-black flex items-center justify-center">
				<p className="text-white/50 text-sm">Redirecting...</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-black text-white">
			{/* Header */}
			<header className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-30">
				<div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
					<div className="flex items-center gap-4">
						<button
							onClick={() => router.push("/tools")}
							className="text-sm text-white/70 hover:text-white transition"
						>
							← Dashboard
						</button>
						<h1
							className="text-lg sm:text-xl md:text-2xl font-medium text-white"
							style={{ fontFamily: "var(--font-benzin)" }}
						>
							Admin Sessions
						</h1>
					</div>
					<button
						onClick={() => fetchData()}
						className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 transition"
					>
						Refresh
					</button>
				</div>
			</header>

			<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
				{/* Tabs */}
				<div className="flex items-center gap-1 mb-4 p-1 rounded-xl bg-white/5 border border-white/10 w-fit">
					<TabButton
						active={tab === "live"}
						onClick={() => setTab("live")}
						label="Live Sessions"
						count={filteredSessions.length}
						pulse
					/>
					<TabButton
						active={tab === "previous"}
						onClick={() => setTab("previous")}
						label="Previous Sessions"
						count={filteredHistory.length}
					/>
				</div>

				{/* Filters */}
				<div className="mb-6 rounded-xl border border-white/10 bg-white/[0.02] p-4">
					<div className="flex flex-wrap items-end gap-4">
						<div className="flex flex-col">
							<label className="text-[11px] uppercase tracking-wider text-white/35 mb-1">
								Filter by date (login)
							</label>
							<input
								type="date"
								value={dateFilter}
								onChange={(e) => setDateFilter(e.target.value)}
								className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:border-white/40"
							/>
						</div>

						<div className="flex flex-col">
							<label className="text-[11px] uppercase tracking-wider text-white/35 mb-1">
								Filter by password
							</label>
							<select
								value={passwordFilter}
								onChange={(e) => setPasswordFilter(e.target.value)}
								className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:border-white/40 min-w-[180px]"
							>
								<option value={ALL_PASSWORDS}>All passwords</option>
								{passwordOptions.map((p) => (
									<option key={p} value={p}>
										{p}
									</option>
								))}
							</select>
						</div>

						{filtersActive && (
							<button
								type="button"
								onClick={() => {
									setDateFilter("");
									setPasswordFilter(ALL_PASSWORDS);
								}}
								className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition"
							>
								Clear filters
							</button>
						)}

						<div className="ml-auto text-xs text-white/40">
							{tab === "live"
								? `${filteredSessions.length} of ${sessions.length} live`
								: `${filteredHistory.length} of ${history.length} previous`}
						</div>
					</div>
				</div>

				{!persistent && (
					<div className="mb-4 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-200">
						Persistent storage is not configured. Sessions are being stored in server memory only and will reset
						on deploy or cold start. Set up Vercel KV (KV_REST_API_URL + KV_REST_API_TOKEN) to enable persistence.
					</div>
				)}

				{error && (
					<div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
						{error}
					</div>
				)}

				{loading ? (
					<div className="text-center text-white/50 py-20 text-sm">Loading sessions...</div>
				) : tab === "live" ? (
					<LiveSessions sessions={filteredSessions} now={now} />
				) : (
					<PreviousSessions history={filteredHistory} />
				)}

				<p className="mt-8 text-center text-xs text-white/30">
					Server time: {new Date(serverTime).toLocaleString()} · Auto-refreshing every 5s
				</p>
			</div>
		</div>
	);
}

/* ── Tab Button ────────────────────────────────────────── */

function TabButton({
	active,
	onClick,
	label,
	count,
	pulse,
}: {
	active: boolean;
	onClick: () => void;
	label: string;
	count: number;
	pulse?: boolean;
}) {
	return (
		<button
			onClick={onClick}
			className={`relative flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
				active
					? "bg-white/10 text-white shadow-sm border border-white/10"
					: "text-white/50 hover:text-white/80 hover:bg-white/5 border border-transparent"
			}`}
		>
			{pulse && count > 0 && (
				<span className="relative flex h-2 w-2">
					<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
					<span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
				</span>
			)}
			{label}
			<span
				className={`rounded-full px-2 py-0.5 text-xs ${
					active ? "bg-white/15 text-white" : "bg-white/5 text-white/40"
				}`}
			>
				{count}
			</span>
		</button>
	);
}

/* ── Live Sessions ─────────────────────────────────────── */

function LiveSessions({ sessions, now }: { sessions: VisitorSession[]; now: number }) {
	if (sessions.length === 0) {
		return (
			<div className="rounded-xl border border-white/10 bg-white/[0.02] p-12 text-center text-white/40">
				No active sessions match the current filters.
			</div>
		);
	}

	return (
		<div className="grid gap-4">
			{sessions.map((s) => {
				const duration = now - s.loginAt;
				const isStale = now - s.lastSeen > 30_000;
				return (
					<div
						key={s.id}
						className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm hover:border-white/15 transition"
					>
						<div className="mb-4 flex flex-wrap items-center justify-between gap-3">
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
									<span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-xs text-white/60">
										{s.role}
									</span>
								)}
							</div>
							<span className="font-mono text-xs text-white/40">
								{s.id.slice(0, 8)}
							</span>
						</div>

						<div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
							<Detail label="Password used" value={s.password ?? "—"} mono />
							<Detail label="IP address" value={s.ip} mono />
							<Detail label="Platform" value={s.platform} />
							<Detail label="Logged in for" value={formatDuration(duration)} highlight />
							<Detail
								label={`Login time (${s.timezone})`}
								value={formatInTimezone(s.loginAt, s.timezone)}
							/>
							<Detail
								label="Login time (IST)"
								value={formatInTimezone(s.loginAt, "Asia/Kolkata")}
							/>
							<Detail label="Timezone" value={s.timezone} />
							<Detail
								label="Last activity"
								value={`${Math.max(0, Math.floor((now - s.lastSeen) / 1000))}s ago`}
							/>
							<Detail label="User agent" value={s.userAgent} small />
						</div>
					</div>
				);
			})}
		</div>
	);
}

/* ── Previous Sessions ─────────────────────────────────── */

function PreviousSessions({ history }: { history: EndedSession[] }) {
	if (history.length === 0) {
		return (
			<div className="rounded-xl border border-white/10 bg-white/[0.02] p-12 text-center text-white/40">
				No previous sessions match the current filters.
			</div>
		);
	}

	return (
		<div className="grid gap-4">
			{history.map((s, idx) => (
				<div
					key={`${s.id}-${idx}`}
					className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm opacity-80 hover:opacity-100 hover:border-white/15 transition"
				>
					<div className="mb-4 flex flex-wrap items-center justify-between gap-3">
						<div className="flex items-center gap-3">
							<span className="inline-block h-2.5 w-2.5 rounded-full bg-white/20" />
							<h3 className="text-lg font-medium text-white/80">
								{s.name ?? "Unknown visitor"}
							</h3>
							{s.role && (
								<span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/50">
									{s.role}
								</span>
							)}
							<span className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-white/40">
								{s.endedReason === "logout"
									? "Logged out"
									: s.endedReason === "stale"
									? "Timed out"
									: "Ended"}
							</span>
						</div>
						<span className="font-mono text-xs text-white/30">
							{s.id.slice(0, 8)}
						</span>
					</div>

					<div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
						<Detail label="Password used" value={s.password ?? "—"} mono />
						<Detail label="IP address" value={s.ip} mono />
						<Detail label="Platform" value={s.platform} />
						<Detail label="Total duration" value={formatDuration(s.duration)} highlight />
						<Detail
							label={`Login time (${s.timezone})`}
							value={formatInTimezone(s.loginAt, s.timezone)}
						/>
						<Detail
							label="Login time (IST)"
							value={formatInTimezone(s.loginAt, "Asia/Kolkata")}
						/>
						<Detail
							label={`Ended at (${s.timezone})`}
							value={formatInTimezone(s.endedAt, s.timezone)}
						/>
						<Detail
							label="Ended at (IST)"
							value={formatInTimezone(s.endedAt, "Asia/Kolkata")}
						/>
						<Detail label="Timezone" value={s.timezone} />
						<Detail label="User agent" value={s.userAgent} small />
					</div>
				</div>
			))}
		</div>
	);
}

/* ── Detail Row ────────────────────────────────────────── */

function Detail({
	label,
	value,
	mono = false,
	small = false,
	highlight = false,
}: {
	label: string;
	value: string;
	mono?: boolean;
	small?: boolean;
	highlight?: boolean;
}) {
	return (
		<div className={small ? "sm:col-span-2 lg:col-span-3" : ""}>
			<div className="text-[11px] uppercase tracking-wider text-white/35">{label}</div>
			<div
				className={`mt-0.5 break-words ${mono ? "font-mono" : ""} ${
					small ? "text-xs text-white/50" : "text-white/80"
				} ${highlight ? "text-white font-medium" : ""}`}
			>
				{value}
			</div>
		</div>
	);
}
