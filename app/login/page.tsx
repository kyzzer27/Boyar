/** @format */

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ password }),
			});

			const data: {
				success?: boolean;
				role?: string;
				error?: string;
				redirect?: string;
				greetName?: string;
				greetTimezone?: string;
				restrictAsk?: boolean;
				chatEnabled?: boolean;
			} = await response.json();

			if (!response.ok || !data.success) {
				setError(data.error ?? "Unable to verify your credentials.");
				setIsLoading(false);
				return;
			}

			if (data.role) {
				sessionStorage.setItem("isAuthenticated", "true");
				sessionStorage.setItem("userRole", String(data.role));
			}

			if (data.greetName) {
				sessionStorage.setItem("greetName", data.greetName);
			}
			if (data.greetTimezone) {
				sessionStorage.setItem("greetTimezone", data.greetTimezone);
			}
			if (data.restrictAsk) {
				sessionStorage.setItem("restrictAsk", "true");
			} else {
				sessionStorage.removeItem("restrictAsk");
			}
			if (data.chatEnabled) {
				sessionStorage.setItem("chatEnabled", "true");
			} else {
				sessionStorage.removeItem("chatEnabled");
			}

			router.push(data.redirect || "/tools");
		} catch (err) {
			console.error("Login error", err);
			setError("Unexpected error verifying credentials.");
			setIsLoading(false);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-teal-50'>
			<div className='max-w-md w-full mx-4'>
				<div className='bg-white rounded-2xl shadow-xl p-8'>
					<div className='text-center mb-8'>
						<Image
							src='/bp-logo.png'
							alt='Boyar Partners'
							width={200}
							height={60}
							className='mx-auto mb-4'
							priority
						/>
						<h1 className='text-2xl font-semibold text-slate-800 mb-2'>
							Secure Portal Login
						</h1>
						<p className='text-slate-600 text-sm'>
							Access restricted to authorized accounts
						</p>
					</div>

					<form onSubmit={handleLogin} className='space-y-6'>
						<div>
							<label
								htmlFor='password'
								className='block text-sm font-medium text-slate-700 mb-2'
							>
								Access Password
							</label>
							<div className='relative'>
								<input
									id='password'
									type={showPassword ? 'text' : 'password'}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className='w-full px-4 py-3 pr-12 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition'
									placeholder='Enter your assigned password'
									required
									autoFocus
								/>
								{password.length > 0 && (
									<button
										type='button'
										onClick={() => setShowPassword((v) => !v)}
										className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition'
										tabIndex={-1}
									>
										{showPassword ? (
											<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94'/><path d='M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19'/><line x1='1' y1='1' x2='23' y2='23'/></svg>
										) : (
											<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'/><circle cx='12' cy='12' r='3'/></svg>
										)}
									</button>
								)}
							</div>
						</div>

						{error && (
							<div className='p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm'>
								{error}
							</div>
						)}

						<button
							type='submit'
							disabled={isLoading}
							className='w-full py-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed'
						>
							{isLoading ? "Authenticating..." : "Login"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
