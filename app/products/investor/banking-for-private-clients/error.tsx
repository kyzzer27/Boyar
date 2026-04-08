/** @format */

"use client";

import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	useEffect(() => {
		// Optionally report error to an analytics service
		console.error("Banking-for-private-clients route error:", error);
	}, [error]);

	return (
		<div className='min-h-screen bg-white flex items-center justify-center px-6'>
			<div className='max-w-md w-full bg-white border border-gray-200 rounded-xl p-6 shadow-sm'>
				<h2
					className='text-lg font-bold text-slate-900 mb-2'
					style={{ fontFamily: "var(--font-avenir)" }}
				>
					Something went wrong
				</h2>
				<p
					className='text-sm text-gray-600 mb-4'
					style={{ fontFamily: "var(--font-avenir)" }}
				>
					The page encountered an unexpected error. You can try reloading.
				</p>
				<div className='flex gap-3'>
					<button
						onClick={() => reset()}
						className='px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800'
						style={{ fontFamily: "var(--font-avenir)" }}
					>
						Reload Page
					</button>
					<a
						href='/products/investor/banking'
						className='px-4 py-2 rounded-lg bg-gray-100 text-gray-800 text-sm font-semibold hover:bg-gray-200'
						style={{ fontFamily: "var(--font-avenir)" }}
					>
						Back to Banking
					</a>
				</div>
			</div>
		</div>
	);
}
