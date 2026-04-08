/** @format */

"use client";

import type { UserRole } from "@/components/layout/app-shell";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
	children: React.ReactNode;
	allowedRoles?: UserRole[];
}

export function ProtectedRoute({
	children,
	allowedRoles,
}: ProtectedRouteProps) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const authStatus = sessionStorage.getItem("isAuthenticated");
		const storedRole = sessionStorage.getItem("userRole") as UserRole | null;

		const flagCookie =
			typeof document !== "undefined"
				? document.cookie
						.split(";")
						.map((c) => c.trim())
						.find((c) => c.startsWith("bp_auth_flag="))
				: undefined;
		const cookieRole = flagCookie
			? (flagCookie.split("=")[1] as UserRole)
			: null;

		const effectiveRole = storedRole ?? cookieRole;
		const passesRole =
			!allowedRoles || (effectiveRole && allowedRoles.includes(effectiveRole));

		if (
			(authStatus === "true" && passesRole) ||
			(cookieRole && passesRole)
		) {
			if (!storedRole && cookieRole) {
				sessionStorage.setItem("isAuthenticated", "true");
				sessionStorage.setItem("userRole", cookieRole);
			}
			setIsAuthenticated(true);
		}

		setIsLoading(false);
	}, [allowedRoles]);

	if (isLoading) {
		return (
			<div className='min-h-screen bg-black text-white flex items-center justify-center'>
				<div className='text-center'>
					<div className='w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4' />
					<p className='text-gray-400'>Verifying access...</p>
				</div>
			</div>
		);
	}

	if (!isAuthenticated) {
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
