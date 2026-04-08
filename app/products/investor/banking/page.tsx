/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const containerVariants = {
	hidden: { opacity: 0, y: 12 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			staggerChildren: 0.08,
			delayChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 12, scale: 0.98 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { duration: 0.5 },
	},
};

export default function BankingPage() {
	const router = useRouter();

	return (
		<ProtectedRoute>
			<div className='relative min-h-screen bg-black text-white'>
				{/* Header */}
				<header className='sticky top-0 bg-black/85 backdrop-blur-sm border-b border-white/10 z-30'>
					<div className='mx-auto flex max-w-5xl items-center justify-between px-6 py-5 sm:px-8'>
						<button
							onClick={() => router.back()}
							className='text-sm text-gray-400 hover:text-white transition flex items-center gap-2 font-medium'
							style={{ fontFamily: "var(--font-benzin)" }}
						>
							← Back
						</button>
						<h1
							className='text-2xl sm:text-3xl font-semibold text-white'
							style={{ fontFamily: "var(--font-benzin)" }}
						>
							Banking — Services
						</h1>
						<div className='w-8' aria-hidden='true'></div>
					</div>
				</header>

				{/* Main Content */}
				<main className='relative z-10 py-16 sm:py-20'>
					<section className='relative mx-auto max-w-6xl px-6 sm:px-8'>
						<div className='absolute inset-0 -z-10 opacity-60'>
							<div className='absolute -top-32 -right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl'></div>
							<div className='absolute -bottom-28 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl'></div>
						</div>
						<motion.div
							variants={containerVariants}
							initial='hidden'
							animate='visible'
							className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6'
						>
							<motion.button
								variants={itemVariants}
								onClick={() => {
									router.push("/products/investor/banking-for-corporates");
								}}
								className='group relative w-full rounded-xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 p-6 sm:p-7 text-left overflow-hidden transition-all duration-300 hover:border-white/20 hover:from-white/12 hover:to-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 shadow-[0_10px_40px_-24px_rgba(255,255,255,0.45)]'
								style={{ fontFamily: "var(--font-benzin)" }}
								whileHover={{ y: -6 }}
								whileTap={{ scale: 0.98 }}
							>
								{/* Top accent line */}
								<div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

								<div className='mb-4 flex items-center justify-between'>
									<div className='text-[11px] font-semibold tracking-[0.18em] text-blue-300/80 uppercase'>
										Service
									</div>
									<div className='text-xl sm:text-2xl font-bold text-white/15 group-hover:text-white/30 transition-colors duration-300'>
										01
									</div>
								</div>

								<div className='space-y-3'>
									<h3 className='text-lg sm:text-xl font-semibold text-white leading-snug group-hover:text-blue-200 transition-colors duration-300'>
										For Corporates
									</h3>
									<div className='w-10 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300'></div>
								</div>

								<div className='absolute bottom-5 right-5 w-9 h-9 border border-white/10 rounded-full group-hover:border-blue-500/50 transition-colors duration-300 flex items-center justify-center'>
									<motion.span
										className='text-base text-gray-300 group-hover:text-white'
										animate={{ x: [0, 4, 0] }}
										transition={{
											duration: 1.6,
											repeat: Infinity,
											delay: 0,
										}}
									>
										→
									</motion.span>
								</div>

								<div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
									<div className='absolute top-0 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2'></div>
									<div className='absolute bottom-0 right-1/4 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl translate-y-1/2'></div>
								</div>
							</motion.button>

							<motion.button
								variants={itemVariants}
								onClick={() => {
									router.push("/products/investor/banking-for-institutions");
								}}
								className='group relative w-full rounded-xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 p-6 sm:p-7 text-left overflow-hidden transition-all duration-300 hover:border-white/20 hover:from-white/12 hover:to-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 shadow-[0_10px_40px_-24px_rgba(255,255,255,0.45)]'
								style={{ fontFamily: "var(--font-benzin)" }}
								whileHover={{ y: -6 }}
								whileTap={{ scale: 0.98 }}
							>
								{/* Top accent line */}
								<div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

								<div className='mb-4 flex items-center justify-between'>
									<div className='text-[11px] font-semibold tracking-[0.18em] text-blue-300/80 uppercase'>
										Service
									</div>
									<div className='text-xl sm:text-2xl font-bold text-white/15 group-hover:text-white/30 transition-colors duration-300'>
										03
									</div>
								</div>

								<div className='space-y-3'>
									<h3 className='text-lg sm:text-xl font-semibold text-white leading-snug group-hover:text-blue-200 transition-colors duration-300'>
										For Institutions
									</h3>
									<div className='w-10 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300'></div>
								</div>

								<div className='absolute bottom-5 right-5 w-9 h-9 border border-white/10 rounded-full group-hover:border-blue-500/50 transition-colors duration-300 flex items-center justify-center'>
									<motion.span
										className='text-base text-gray-300 group-hover:text-white'
										animate={{ x: [0, 4, 0] }}
										transition={{
											duration: 1.6,
											repeat: Infinity,
											delay: 2,
										}}
									>
										→
									</motion.span>
								</div>

								<div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
									<div className='absolute top-0 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2'></div>
									<div className='absolute bottom-0 right-1/4 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl translate-y-1/2'></div>
								</div>
							</motion.button>

							<motion.button
								variants={itemVariants}
								onClick={() => {
									router.push("/products/investor/banking-for-private-clients");
								}}
								className='group relative w-full rounded-xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 p-6 sm:p-7 text-left overflow-hidden transition-all duration-300 hover:border-white/20 hover:from-white/12 hover:to-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 shadow-[0_10px_40px_-24px_rgba(255,255,255,0.45)]'
								style={{ fontFamily: "var(--font-benzin)" }}
								whileHover={{ y: -6 }}
								whileTap={{ scale: 0.98 }}
							>
								{/* Top accent line */}
								<div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

								<div className='mb-4 flex items-center justify-between'>
									<div className='text-[11px] font-semibold tracking-[0.18em] text-blue-300/80 uppercase'>
										Service
									</div>
									<div className='text-xl sm:text-2xl font-bold text-white/15 group-hover:text-white/30 transition-colors duration-300'>
										02
									</div>
								</div>

								<div className='space-y-3'>
									<h3 className='text-lg sm:text-xl font-semibold text-white leading-snug group-hover:text-blue-200 transition-colors duration-300'>
										For Private Clients
									</h3>
									<div className='w-10 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300'></div>
								</div>

								<div className='absolute bottom-5 right-5 w-9 h-9 border border-white/10 rounded-full group-hover:border-blue-500/50 transition-colors duration-300 flex items-center justify-center'>
									<motion.span
										className='text-base text-gray-300 group-hover:text-white'
										animate={{ x: [0, 4, 0] }}
										transition={{
											duration: 1.6,
											repeat: Infinity,
											delay: 1,
										}}
									>
										→
									</motion.span>
								</div>

								<div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
									<div className='absolute top-0 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2'></div>
									<div className='absolute bottom-0 right-1/4 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl translate-y-1/2'></div>
								</div>
							</motion.button>
						</motion.div>
					</section>
				</main>
			</div>
		</ProtectedRoute>
	);
}
