/** @format */

"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white flex items-center justify-center px-6'>
			<div className='max-w-md w-full text-center'>
				<div className='mb-8'>
					<h1
						className='text-4xl font-bold mb-4'
						style={{ fontFamily: "var(--font-benzin)" }}
					>
						Oops! Something Went Wrong
					</h1>
					<p className='text-gray-400 mb-6'>
						An unexpected error occurred. Our team has been notified.
					</p>
					{error.message && (
						<div className='bg-white/5 border border-white/10 rounded-lg p-4 mb-8 text-left'>
							<p className='text-sm text-gray-300 font-mono break-words'>
								{error.message}
							</p>
						</div>
					)}
				</div>

				<div className='space-y-4'>
					<button
						onClick={reset}
						className='w-full px-6 py-3 rounded-lg bg-white text-slate-900 font-semibold hover:bg-gray-100 transition-colors'
					>
						Try Again
					</button>
					<Link
						href='/'
						className='block px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors text-center'
					>
						Return Home
					</Link>
				</div>
			</div>
		</div>
	);
}
