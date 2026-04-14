/** @format */

"use client";

import type { UserRole } from "@/components/layout/app-shell";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

interface ProtectedRouteProps {
	children: React.ReactNode;
	allowedRoles?: UserRole[];
}

// Run the auth check synchronously *before* paint on the client so that
// already-authenticated users never see a spinner flash when navigating
// between protected pages. Falls back to useEffect during SSR to avoid
// React's "useLayoutEffect on the server" warning.
const useIsoLayoutEffect =
	typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface AuthState {
	checked: boolean;
	authenticated: boolean;
}

function readAuthSync(allowedRoles?: UserRole[]): AuthState {
	if (typeof window === "undefined") {
		return { checked: false, authenticated: false };
	}

	const authStatus = sessionStorage.getItem("isAuthenticated");
	const storedRole = sessionStorage.getItem("userRole") as UserRole | null;

	const flagCookie = document.cookie
		.split(";")
		.map((c) => c.trim())
		.find((c) => c.startsWith("bp_auth_flag="));
	const cookieRole = flagCookie
		? (flagCookie.split("=")[1] as UserRole)
		: null;

	const effectiveRole = storedRole ?? cookieRole;
	const passesRole =
		!allowedRoles || (effectiveRole && allowedRoles.includes(effectiveRole));

	const isAuthed =
		(authStatus === "true" && passesRole) ||
		(Boolean(cookieRole) && Boolean(passesRole));

	if (isAuthed && !storedRole && cookieRole) {
		sessionStorage.setItem("isAuthenticated", "true");
		sessionStorage.setItem("userRole", cookieRole);
	}

	return { checked: true, authenticated: Boolean(isAuthed) };
}

export function ProtectedRoute({
	children,
	allowedRoles,
}: ProtectedRouteProps) {
	// Lazy initializer runs once per mount on the client and is what eliminates
	// the spinner flash on intra-portal navigation.
	const [authState, setAuthState] = useState<AuthState>(() =>
		readAuthSync(allowedRoles)
	);
	const router = useRouter();

	// Re-validate on the client before first paint to cover edge cases where
	// the lazy initializer ran during a server render (checked === false).
	useIsoLayoutEffect(() => {
		if (!authState.checked) {
			setAuthState(readAuthSync(allowedRoles));
		}
	}, [allowedRoles, authState.checked]);

	if (!authState.checked) {
		// SSR / very first paint — render nothing instead of a spinner so
		// users don't perceive a "verifying access" delay on every navigation.
		return null;
	}

	if (!authState.authenticated) {
		return (
			<div className='min-h-screen bg-black text-white flex items-center justify-center px-6'>
				<div className='max-w-md w-full bg-black/85 border border-white/10 rounded-xl p-6'>
					<h2
						className='text-lg font-semibold mb-2'
						style={{ fontFamily: "var(--font-benzin)" }}
					>
						Access Restricted
					</h2>
					<p className='text-sm text-gray-400 mb-4'>
						You are not authorized or your session has expired. Please login to
						continue.
					</p>
					<div className='flex gap-3'>
						<a
							href='/login'
							className='px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-semibold hover:bg-white/20'
						>
							Go to Login
						</a>
						<button
							onClick={() => router.push("/")}
							className='px-4 py-2 rounded-lg bg-white/5 text-white text-sm font-semibold hover:bg-white/15'
						>
							Home
						</button>
					</div>
				</div>
			</div>
		);
	}

	return <>{children}</>;
}
