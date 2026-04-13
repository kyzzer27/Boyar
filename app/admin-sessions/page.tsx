"use client";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
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

interface Analytics {
	todayVisits: number;
	todayUniqueIps: number;
	todayUniqueUsers: number;
	avgDurationMs: number;
	liveDurationTotalMs: number;
	totalHistory: number;
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
	if (!Number.isFinite(ms) || ms <= 0) return "— (<1s)";
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

/** Best-effort device summary parsed from a user-agent string. */
function parseDevice(ua: string): { browser: string; os: string } {
	if (!ua) return { browser: "—", os: "—" };
	const u = ua;
	let browser = "Browser";
	if (/Edg\//.test(u)) browser = "Edge";
	else if (/OPR\//.test(u) || /Opera/.test(u)) browser = "Opera";
	else if (/Chrome\//.test(u) && !/Chromium/.test(u)) browser = "Chrome";
	else if (/Firefox\//.test(u)) browser = "Firefox";
	else if (/Safari\//.test(u)) browser = "Safari";

	let os = "OS";
	if (/Windows NT 11/.test(u)) os = "Windows 11";
	else if (/Windows NT 10/.test(u)) os = "Windows 10";
	else if (/Windows/.test(u)) os = "Windows";
	else if (/iPhone|iPad|iPod/.test(u)) os = "iOS";
	else if (/Android/.test(u)) os = "Android";
	else if (/Mac OS X/.test(u)) os = "macOS";
	else if (/Linux/.test(u)) os = "Linux";

	return { browser, os };
}

function escapeCsv(v: unknown): string {
	const s = v === null || v === undefined ? "" : String(v);
	if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
	return s;
}

function downloadBlob(content: string, filename: string, mime = "text/csv") {
	const blob = new Blob([content], { type: mime });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	setTimeout(() => URL.revokeObjectURL(url), 0);
}

/* ── Page ──────────────────────────────────────────────── */

type Tab = "live" | "previous";
const ALL_PASSWORDS = "__all__";

// Fixed list of passwords shown in the filter dropdown — always available
// regardless of whether anyone has logged in with them yet. Note: BPJoel27
// (admin) is intentionally excluded.
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

// Passwords that should never appear anywhere in this dashboard.
const HIDDEN_PASSWORDS = new Set<string>(["BPJoel27"]);

export default function AdminSessionsPage() {
	const router = useRouter();
	const [authorized, setAuthorized] = useState(false);
	const [tab, setTab] = useState<Tab>("live");
	const [sessions, setSessions] = useState<VisitorSession[]>([]);
	const [history, setHistory] = useState<EndedSession[]>([]);
	const [analytics, setAnalytics] = useState<Analytics | null>(null);
	const [serverTime, setServerTime] = useState<number>(Date.now());
	const [persistent, setPersistent] = useState<boolean>(false);
	const [now, setNow] = useState<number>(Date.now());
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [actionBusy, setActionBusy] = useState<string | null>(null);

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
			const filterOutAdmin = <T extends { password?: string | null }>(arr: T[]): T[] =>
				arr.filter((s) => !(s.password && HIDDEN_PASSWORDS.has(s.password)));
			setSessions(filterOutAdmin(data.sessions ?? []));
			setHistory(filterOutAdmin(data.history ?? []));
			setAnalytics(data.analytics ?? null);
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

	/* Password filter options = fixed known list + anything new we've seen,
	 * minus anything in HIDDEN_PASSWORDS. */
	const passwordOptions = useMemo(() => {
		const set = new Set<string>(KNOWN_PASSWORDS);
		for (const s of sessions) if (s.password) set.add(s.password);
		for (const s of history) if (s.password) set.add(s.password);
		for (const hidden of HIDDEN_PASSWORDS) set.delete(hidden);
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

	/* ── Admin actions ───────────────────────────────────── */

	const exportHistoryCsv = useCallback(() => {
		const rows: string[] = [];
		rows.push(
			[
				"name",
				"password",
				"role",
				"ip",
				"platform",
				"browser",
				"os",
				"timezone",
				"login_at_iso",
				"ended_at_iso",
				"duration_seconds",
				"ended_reason",
				"session_id",
				"user_agent",
			].join(",")
		);
		for (const s of filteredHistory) {
			const dev = parseDevice(s.userAgent);
			rows.push(
				[
					s.name ?? "",
					s.password ?? "",
					s.role ?? "",
					s.ip,
					s.platform,
					dev.browser,
					dev.os,
					s.timezone,
					new Date(s.loginAt).toISOString(),
					new Date(s.endedAt).toISOString(),
					Math.floor((s.duration ?? 0) / 1000),
					s.endedReason ?? "",
					s.id,
					s.userAgent,
				]
					.map(escapeCsv)
					.join(",")
			);
		}
		downloadBlob(rows.join("\n"), `sessions-history-${toLocalDateKey(Date.now())}.csv`);
	}, [filteredHistory]);

	const clearHistory = useCallback(async () => {
		if (!window.confirm("Clear ALL previous session history? This cannot be undone.")) return;
		setActionBusy("clear");
		try {
			const res = await fetch("/api/admin/visitors", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "same-origin",
				body: JSON.stringify({ action: "clearHistory" }),
			});
			if (!res.ok) throw new Error();
			await fetchData();
		} catch {
			setError("Failed to clear history.");
		} finally {
			setActionBusy(null);
		}
	}, [fetchData]);

	const kickSession = useCallback(
		async (sessionId: string) => {
			if (!window.confirm("Force end this live session?")) return;
			setActionBusy(sessionId);
			try {
				const res = await fetch("/api/admin/visitors", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					credentials: "same-origin",
					body: JSON.stringify({ action: "kick", sessionId }),
				});
				if (!res.ok) throw new Error();
				await fetchData();
			} catch {
				setError("Failed to end session.");
			} finally {
				setActionBusy(null);
			}
		},
		[fetchData]
	);

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
					<div className="flex items-center gap-2">
						<button
							onClick={() => fetchData()}
							className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10 transition"
						>
							Refresh
						</button>
					</div>
				</div>
			</header>

			<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
				{/* Stats */}
				<StatsGrid analytics={analytics} liveCount={sessions.length} />

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

				{/* Filters + action bar */}
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

						<div className="ml-auto flex items-center gap-2">
							<button
								type="button"
								onClick={exportHistoryCsv}
								disabled={filteredHistory.length === 0}
								className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
							>
								Export CSV
							</button>
							<button
								type="button"
								onClick={clearHistory}
								disabled={actionBusy === "clear" || history.length === 0}
								className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200 hover:bg-red-500/20 transition disabled:opacity-40 disabled:cursor-not-allowed"
							>
								{actionBusy === "clear" ? "Clearing..." : "Clear history"}
							</button>
						</div>
					</div>
					<div className="mt-3 text-xs text-white/40">
						{tab === "live"
							? `${filteredSessions.length} of ${sessions.length} live`
							: `${filteredHistory.length} of ${history.length} previous`}
						{" · "}
						<span className="text-white/30">
							Tip: visitors on the same Wi-Fi share a public IP. Use the Platform and
							Browser/OS fields to tell devices apart.
						</span>
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
					<LiveSessions
						sessions={filteredSessions}
						now={now}
						onKick={kickSession}
						busyId={actionBusy}
					/>
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

/* ── Stats grid ────────────────────────────────────────── */

function StatsGrid({
	analytics,
	liveCount,
}: {
	analytics: Analytics | null;
	liveCount: number;
}) {
	const cards: Array<{ label: string; value: string; hint?: string }> = [
		{ label: "Live now", value: String(liveCount), hint: "Currently active sessions" },
		{
			label: "Visits today",
			value: analytics ? String(analytics.todayVisits) : "—",
			hint: "Live + ended since midnight",
		},
		{
			label: "Unique users today",
			value: analytics ? String(analytics.todayUniqueUsers) : "—",
			hint: "Distinct passwords",
		},
		{
			label: "Unique IPs today",
			value: analytics ? String(analytics.todayUniqueIps) : "—",
			hint: "Distinct IP addresses",
		},
		{
			label: "Avg session",
			value: analytics ? formatDuration(analytics.avgDurationMs) : "—",
			hint: "Across stored history",
		},
		{
			label: "Total history",
			value: analytics ? String(analytics.totalHistory) : "—",
			hint: "Ended sessions on record",
		},
	];
	return (
		<div className="mb-6 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
			{cards.map((c) => (
				<div
					key={c.label}
					className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 backdrop-blur-sm"
				>
					<div className="text-[10px] uppercase tracking-wider text-white/40">{c.label}</div>
					<div className="mt-1 text-lg font-semibold text-white">{c.value}</div>
					{c.hint && <div className="mt-0.5 text-[10px] text-white/30">{c.hint}</div>}
				</div>
			))}
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

function displayName(s: VisitorSession): string {
	if (s.name && s.name !== "__no_name__") return s.name;
	if (s.password) return `User (${s.password})`;
	return "Anonymous visitor";
}

function LiveSessions({
	sessions,
	now,
	onKick,
	busyId,
}: {
	sessions: VisitorSession[];
	now: number;
	onKick: (id: string) => void;
	busyId: string | null;
}) {
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
				const dev = parseDevice(s.userAgent);
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
								<h3 className="text-lg font-medium text-white">{displayName(s)}</h3>
								{s.role && (
									<span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-xs text-white/60">
										{s.role}
									</span>
								)}
							</div>
							<div className="flex items-center gap-3">
								<span className="font-mono text-xs text-white/40">{s.id.slice(0, 8)}</span>
								<button
									type="button"
									onClick={() => onKick(s.id)}
									disabled={busyId === s.id}
									className="rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-xs text-red-200 hover:bg-red-500/20 transition disabled:opacity-40"
								>
									{busyId === s.id ? "Ending..." : "Force end"}
								</button>
							</div>
						</div>

						<div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
							<Detail label="Password used" value={s.password ?? "—"} mono />
							<Detail label="IP address" value={s.ip} mono />
							<Detail label="Platform" value={`${s.platform} · ${dev.os}`} />
							<Detail label="Browser" value={dev.browser} />
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

type ViewMode = "cards" | "table";
const PAGE_SIZES = [10, 20, 50, 100] as const;

function PreviousSessions({ history }: { history: EndedSession[] }) {
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [search, setSearch] = useState("");
	const [viewMode, setViewMode] = useState<ViewMode>("table");
	const [expandedId, setExpandedId] = useState<string | null>(null);
	const [jumpInput, setJumpInput] = useState("");

	/* Search filter — runs on already-filtered history */
	const searched = useMemo(() => {
		if (!search.trim()) return history;
		const q = search.toLowerCase().trim();
		return history.filter((s) => {
			const name = (s.name ?? "").toLowerCase();
			const pw = (s.password ?? "").toLowerCase();
			const ip = s.ip.toLowerCase();
			const id = s.id.toLowerCase();
			const tz = s.timezone.toLowerCase();
			const reason = (s.endedReason ?? "").toLowerCase();
			return (
				name.includes(q) ||
				pw.includes(q) ||
				ip.includes(q) ||
				id.includes(q) ||
				tz.includes(q) ||
				reason.includes(q)
			);
		});
	}, [history, search]);

	const totalPages = Math.max(1, Math.ceil(searched.length / pageSize));

	/* Clamp page when data changes */
	const safePage = Math.min(page, totalPages);
	if (safePage !== page) setPage(safePage);

	const start = (safePage - 1) * pageSize;
	const pageItems = searched.slice(start, start + pageSize);

	/* Page navigation helpers */
	const goTo = (p: number) => setPage(Math.max(1, Math.min(p, totalPages)));

	const handleJump = () => {
		const n = parseInt(jumpInput, 10);
		if (!isNaN(n)) goTo(n);
		setJumpInput("");
	};

	/* Build visible page numbers (show max 7, with ellipses) */
	const pageNumbers = useMemo(() => {
		const pages: (number | "...")[] = [];
		if (totalPages <= 7) {
			for (let i = 1; i <= totalPages; i++) pages.push(i);
		} else {
			pages.push(1);
			if (safePage > 3) pages.push("...");
			const lo = Math.max(2, safePage - 1);
			const hi = Math.min(totalPages - 1, safePage + 1);
			for (let i = lo; i <= hi; i++) pages.push(i);
			if (safePage < totalPages - 2) pages.push("...");
			pages.push(totalPages);
		}
		return pages;
	}, [safePage, totalPages]);

	if (history.length === 0) {
		return (
			<div className="rounded-xl border border-white/10 bg-white/[0.02] p-12 text-center text-white/40">
				No previous sessions match the current filters.
			</div>
		);
	}

	return (
		<div>
			{/* ── Toolbar: search + view toggle + page size ── */}
			<div className="mb-4 flex flex-wrap items-center gap-3">
				{/* Search */}
				<div className="relative flex-1 min-w-[200px] max-w-md">
					<svg
						className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
						/>
					</svg>
					<input
						type="text"
						placeholder="Search by name, IP, password, session ID..."
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
							setPage(1);
						}}
						className="w-full rounded-lg border border-white/15 bg-black/40 pl-9 pr-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40"
					/>
					{search && (
						<button
							type="button"
							onClick={() => {
								setSearch("");
								setPage(1);
							}}
							className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 text-xs"
						>
							clear
						</button>
					)}
				</div>

				{/* View mode toggle */}
				<div className="flex items-center rounded-lg border border-white/15 bg-black/40 overflow-hidden">
					<button
						type="button"
						onClick={() => setViewMode("table")}
						className={`px-3 py-2 text-xs transition ${
							viewMode === "table"
								? "bg-white/15 text-white"
								: "text-white/40 hover:text-white/70"
						}`}
						title="Compact table view"
					>
						<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					</button>
					<button
						type="button"
						onClick={() => setViewMode("cards")}
						className={`px-3 py-2 text-xs transition ${
							viewMode === "cards"
								? "bg-white/15 text-white"
								: "text-white/40 hover:text-white/70"
						}`}
						title="Detailed card view"
					>
						<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<rect x="3" y="3" width="7" height="7" rx="1" />
							<rect x="14" y="3" width="7" height="7" rx="1" />
							<rect x="3" y="14" width="7" height="7" rx="1" />
							<rect x="14" y="14" width="7" height="7" rx="1" />
						</svg>
					</button>
				</div>

				{/* Page size */}
				<div className="flex items-center gap-2">
					<span className="text-[11px] text-white/35 uppercase tracking-wider">Per page</span>
					<select
						value={pageSize}
						onChange={(e) => {
							setPageSize(Number(e.target.value));
							setPage(1);
						}}
						className="rounded-lg border border-white/15 bg-black/40 px-2 py-2 text-sm text-white focus:outline-none focus:border-white/40"
					>
						{PAGE_SIZES.map((s) => (
							<option key={s} value={s}>
								{s}
							</option>
						))}
					</select>
				</div>

				{/* Result count */}
				<span className="ml-auto text-xs text-white/40">
					{searched.length === history.length
						? `${history.length} sessions`
						: `${searched.length} of ${history.length} match`}
				</span>
			</div>

			{/* ── Content ── */}
			{searched.length === 0 ? (
				<div className="rounded-xl border border-white/10 bg-white/[0.02] p-12 text-center text-white/40">
					No sessions match &quot;{search}&quot;
				</div>
			) : viewMode === "table" ? (
				/* ── Compact Table View ── */
				<div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b border-white/10 text-left">
									<th className="px-4 py-3 text-[11px] uppercase tracking-wider text-white/40 font-medium">User</th>
									<th className="px-4 py-3 text-[11px] uppercase tracking-wider text-white/40 font-medium">Password</th>
									<th className="px-4 py-3 text-[11px] uppercase tracking-wider text-white/40 font-medium">IP</th>
									<th className="px-4 py-3 text-[11px] uppercase tracking-wider text-white/40 font-medium">Platform</th>
									<th className="px-4 py-3 text-[11px] uppercase tracking-wider text-white/40 font-medium">Duration</th>
									<th className="px-4 py-3 text-[11px] uppercase tracking-wider text-white/40 font-medium">Login (IST)</th>
									<th className="px-4 py-3 text-[11px] uppercase tracking-wider text-white/40 font-medium">Ended (IST)</th>
									<th className="px-4 py-3 text-[11px] uppercase tracking-wider text-white/40 font-medium">Reason</th>
								</tr>
							</thead>
							<tbody>
								{pageItems.map((s, idx) => {
									const dev = parseDevice(s.userAgent);
									const isExpanded = expandedId === `${s.id}-${idx}`;
									return (
										<Fragment key={`${s.id}-${idx}`}>
											<tr
												onClick={() =>
													setExpandedId(isExpanded ? null : `${s.id}-${idx}`)
												}
												className={`border-b border-white/5 cursor-pointer transition hover:bg-white/5 ${
													isExpanded ? "bg-white/5" : ""
												}`}
											>
												<td className="px-4 py-3 text-white/80 font-medium whitespace-nowrap">
													<div className="flex items-center gap-2">
														<svg
															className={`h-3 w-3 text-white/30 transition-transform ${
																isExpanded ? "rotate-90" : ""
															}`}
															fill="none"
															viewBox="0 0 24 24"
															stroke="currentColor"
															strokeWidth={2}
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M9 5l7 7-7 7"
															/>
														</svg>
														{displayName(s)}
													</div>
												</td>
												<td className="px-4 py-3 font-mono text-xs text-white/60">
													{s.password ?? "—"}
												</td>
												<td className="px-4 py-3 font-mono text-xs text-white/60">
													{s.ip}
												</td>
												<td className="px-4 py-3 text-white/60 whitespace-nowrap">
													{s.platform} · {dev.browser}
												</td>
												<td className="px-4 py-3 text-white font-medium whitespace-nowrap">
													{formatDuration(s.duration)}
												</td>
												<td className="px-4 py-3 text-white/60 whitespace-nowrap text-xs">
													{formatInTimezone(s.loginAt, "Asia/Kolkata")}
												</td>
												<td className="px-4 py-3 text-white/60 whitespace-nowrap text-xs">
													{formatInTimezone(s.endedAt, "Asia/Kolkata")}
												</td>
												<td className="px-4 py-3">
													<span
														className={`rounded-full px-2 py-0.5 text-xs ${
															s.endedReason === "logout"
																? "bg-blue-500/10 text-blue-300"
																: s.endedReason === "stale"
																? "bg-yellow-500/10 text-yellow-300"
																: "bg-white/5 text-white/40"
														}`}
													>
														{s.endedReason === "logout"
															? "Logged out"
															: s.endedReason === "stale"
															? "Timed out"
															: "Ended"}
													</span>
												</td>
											</tr>
											{isExpanded && (
												<tr key={`${s.id}-${idx}-detail`} className="bg-white/[0.03]">
													<td colSpan={8} className="px-6 py-4">
														<div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
															<Detail label="Session ID" value={s.id} mono />
															<Detail label="OS" value={dev.os} />
															<Detail label="Browser" value={dev.browser} />
															<Detail label="Timezone" value={s.timezone} />
															<Detail
																label={`Login (${s.timezone})`}
																value={formatInTimezone(s.loginAt, s.timezone)}
															/>
															<Detail
																label={`Ended (${s.timezone})`}
																value={formatInTimezone(s.endedAt, s.timezone)}
															/>
															{s.role && <Detail label="Role" value={s.role} />}
															<Detail label="User agent" value={s.userAgent} small />
														</div>
													</td>
												</tr>
											)}
										</Fragment>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			) : (
				/* ── Card View (original style, paginated) ── */
				<div className="grid gap-4">
					{pageItems.map((s, idx) => {
						const dev = parseDevice(s.userAgent);
						return (
							<div
								key={`${s.id}-${idx}`}
								className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm opacity-80 hover:opacity-100 hover:border-white/15 transition"
							>
								<div className="mb-4 flex flex-wrap items-center justify-between gap-3">
									<div className="flex items-center gap-3">
										<span className="inline-block h-2.5 w-2.5 rounded-full bg-white/20" />
										<h3 className="text-lg font-medium text-white/80">{displayName(s)}</h3>
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
									<span className="font-mono text-xs text-white/30">{s.id.slice(0, 8)}</span>
								</div>

								<div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
									<Detail label="Password used" value={s.password ?? "—"} mono />
									<Detail label="IP address" value={s.ip} mono />
									<Detail label="Platform" value={`${s.platform} · ${dev.os}`} />
									<Detail label="Browser" value={dev.browser} />
									<Detail
										label="Total duration"
										value={formatDuration(s.duration)}
										highlight
									/>
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
						);
					})}
				</div>
			)}

			{/* ── Pagination Controls ── */}
			{totalPages > 1 && (
				<div className="mt-6 flex flex-wrap items-center justify-center gap-2">
					{/* Prev */}
					<button
						type="button"
						onClick={() => goTo(safePage - 1)}
						disabled={safePage === 1}
						className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed"
					>
						Prev
					</button>

					{/* Page numbers */}
					{pageNumbers.map((p, i) =>
						p === "..." ? (
							<span key={`ellipsis-${i}`} className="px-2 text-white/30 text-sm">
								...
							</span>
						) : (
							<button
								key={p}
								type="button"
								onClick={() => goTo(p)}
								className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
									p === safePage
										? "bg-white/15 text-white border border-white/20"
										: "border border-transparent text-white/50 hover:bg-white/5 hover:text-white/80"
								}`}
							>
								{p}
							</button>
						)
					)}

					{/* Next */}
					<button
						type="button"
						onClick={() => goTo(safePage + 1)}
						disabled={safePage === totalPages}
						className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed"
					>
						Next
					</button>

					{/* Jump to page */}
					<div className="flex items-center gap-1 ml-4">
						<span className="text-xs text-white/35">Go to</span>
						<input
							type="number"
							min={1}
							max={totalPages}
							value={jumpInput}
							onChange={(e) => setJumpInput(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && handleJump()}
							placeholder="#"
							className="w-14 rounded-lg border border-white/15 bg-black/40 px-2 py-1.5 text-sm text-white text-center focus:outline-none focus:border-white/40"
						/>
						<button
							type="button"
							onClick={handleJump}
							className="rounded-lg border border-white/15 bg-white/5 px-2 py-1.5 text-xs text-white/60 hover:bg-white/10 hover:text-white transition"
						>
							Go
						</button>
					</div>

					{/* Page indicator */}
					<span className="ml-4 text-xs text-white/40">
						Page {safePage} of {totalPages} · Showing {start + 1}–{Math.min(start + pageSize, searched.length)} of{" "}
						{searched.length}
					</span>
				</div>
			)}
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
