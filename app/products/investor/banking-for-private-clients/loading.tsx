/** @format */

export default function Loading() {
	return (
		<div className='min-h-screen bg-white flex items-center justify-center'>
			<div className='text-center'>
				<div className='w-16 h-16 border-4 border-gray-200 border-t-slate-900 rounded-full animate-spin mx-auto mb-4' />
				<p
					className='text-gray-600'
					style={{ fontFamily: "var(--font-avenir)" }}
				>
					Loading private banking data...
				</p>
			</div>
		</div>
	);
}
