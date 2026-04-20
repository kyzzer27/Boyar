/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "@/components/motion/lite-motion";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type Service = {
	id: number;
	title: string;
	key: string;
	pdf?: string; // to be provided next; will render viewer when available
};

const services: Service[] = [
	{
		id: 1,
		title: "Swift BIC code activation",
		key: "swift-bic",
		pdf: "/institution-pdfs/swift-bic-code-activation.pdf",
	},
	{
		id: 2,
		title: "White-label card programs",
		key: "white-label-cards",
		pdf: "/institution-pdfs/white-label-card-programs.pdf",
	},
	{
		id: 3,
		title: "Safeguarding account opening options",
		key: "safeguarding-accounts",
		pdf: "/institution-pdfs/safeguarding-banking-options.pdf",
	},
	{ id: 4, title: "SEPA membership", key: "sepa-membership" },
	{ id: 5, title: "VISA and Mastercard programs", key: "visa-mastercard" },
	{
		id: 6,
		title: "Correspondent account opening options",
		key: "correspondent-accounts",
		pdf: "/institution-pdfs/correspondent-banking-options.pdf",
	},
];

const containerVariants = {
	hidden: { opacity: 0, y: 12 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, staggerChildren: 0.06, delayChildren: 0.15 },
	},
};

const cardVariants = {
	hidden: { opacity: 0, y: 10, scale: 0.98 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { duration: 0.45 },
	},
};

export default function BankingForInstitutionsPage() {
	const router = useRouter();
	const [selected, setSelected] = useState<Service | null>(null);
	const [isExpanded, setIsExpanded] = useState(false);
	const viewerRef = useRef<HTMLObjectElement | null>(null);

	return (
		<ProtectedRoute>
			<div className={`relative min-h-screen bg-neutral-950 text-white`}>
				{/* Header */}
				<header
					className={`${
						isExpanded ? "fixed top-0 left-0 right-0" : "sticky top-0"
					} bg-neutral-950/85  border-b border-white/10 z-30`}
				>
					<div className='mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8'>
						<button
							onClick={() => {
								if (selected) {
									setSelected(null);
									setIsExpanded(false);
								} else {
									router.back();
								}
							}}
							className='text-sm text-gray-400 hover:text-white transition flex items-center gap-2 font-medium'
							style={{ fontFamily: "var(--font-benzin)" }}
						>
							← Back
						</button>
						<h1
							className='text-2xl sm:text-3xl font-semibold text-white'
							style={{ fontFamily: "var(--font-benzin)" }}
						>
							Banking — For Institutions
						</h1>
						<div className='w-8' aria-hidden='true'></div>
					</div>
				</header>

				{/* Accent background glows */}
				<div className='pointer-events-none absolute inset-0 -z-10'>
					<div className='absolute -top-24 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl' />
					<div className='absolute -bottom-24 -left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl' />
				</div>

				{/* Content */}
				<main
					className={`${
						isExpanded
							? "fixed inset-0 top-[57px] z-40 py-0"
							: "relative z-10 py-16 sm:py-20"
					}`}
				>
					<section
						className={`${
							isExpanded
								? "h-full w-full px-0 py-0"
								: "mx-auto max-w-6xl px-6 sm:px-8"
						}`}
					>
						{/* Service Cards */}
						<motion.div
							variants={containerVariants}
							initial='hidden'
							animate='visible'
							className={`${
								isExpanded
									? "hidden"
									: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
							}`}
						>
							{services.map((svc, idx) => (
								<motion.button
									key={svc.key}
									variants={cardVariants}
									onClick={() => {
										setSelected(svc);
									}}
									className='group relative w-full rounded-2xl border border-white/10 bg-gradient-to-br from-white/6 to-white/3 p-6 sm:p-7 text-left overflow-hidden transition-colors duration-300 hover:border-white/20 hover:from-white/10 hover:to-white/6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20'
									style={{ fontFamily: "var(--font-benzin)" }}
									whileHover={{ y: -6 }}
									whileTap={{ scale: 0.98 }}
								>
									{/* Animated top accent line */}
									<div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

									{/* Header row */}
									<div className='mb-4 flex items-center justify-between'>
										<div className='text-[11px] font-semibold tracking-[0.18em] text-blue-300/80 uppercase'>
											Service
										</div>
										<div className='text-xl sm:text-2xl font-bold text-white/15 group-hover:text-white/30 transition-colors duration-300'>
											{(idx + 1).toString().padStart(2, "0")}
										</div>
									</div>

									{/* Title */}
									<div className='space-y-3'>
										<h3 className='text-lg sm:text-xl font-semibold text-white leading-snug group-hover:text-blue-200 transition-colors duration-300'>
											{svc.title}
										</h3>
										<div className='w-12 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300' />
									</div>

									{/* Subtle glow accents */}
									<div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
										<div className='absolute top-0 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2' />
										<div className='absolute bottom-0 right-1/4 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl translate-y-1/2' />
									</div>
								</motion.button>
							))}
						</motion.div>

						{/* Embedded PDF Viewer (default browser viewer) */}
						<div
							className={`${
								isExpanded ? "h-full flex flex-col" : "mt-10 sm:mt-12"
							}`}
						>
							{selected ? (
								<div
									className={`${
										isExpanded
											? "h-full flex flex-col rounded-none border-0 bg-neutral-950 p-0"
											: "rounded-2xl border border-white/10 bg-white/5 p-4"
									}`}
								>
									<div className='mb-3 flex items-center justify-between gap-3 flex-wrap'>
										<div
											className='text-sm text-gray-300'
											style={{ fontFamily: "var(--font-avenir)" }}
										>
											Viewing:{" "}
											<span className='font-semibold text-white'>
												{selected.title}
											</span>
										</div>
										<div className='flex items-center gap-2'>
											<button
												onClick={() => setIsExpanded(true)}
												disabled={isExpanded}
												className={`text-xs px-3 py-1.5 rounded-lg border transition ${
													isExpanded
														? "opacity-50 cursor-not-allowed"
														: "border-white/10 text-gray-300 hover:text-white hover:border-white/20"
												}`}
											>
												Full Screen
											</button>
											{isExpanded && (
												<button
													onClick={() => setIsExpanded(false)}
													className='text-xs px-3 py-1.5 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition'
												>
													Exit Full Screen
												</button>
											)}
											<button
												onClick={() => setSelected(null)}
												className='text-xs px-3 py-1.5 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition'
											>
												Close
											</button>
										</div>
									</div>

									{/* If PDF path is available, embed; else show placeholder */}
									{selected.pdf ? (
										<object
											ref={viewerRef}
											data={selected.pdf}
											type='application/pdf'
											className={`w-full ${
												isExpanded
													? "flex-1 rounded-none"
													: "h-[70vh] rounded-xl"
											}`}
										>
											<iframe
												src={selected.pdf}
												className={`w-full ${
													isExpanded ? "h-full" : "h-[70vh]"
												}`}
												allowFullScreen
											/>
										</object>
									) : (
										<div className='w-full h-[40vh] sm:h-[50vh] flex items-center justify-center rounded-xl border border-white/10 bg-black/30'>
											<p
												className='text-sm text-gray-400'
												style={{ fontFamily: "var(--font-avenir)" }}
											>
												{selected.key === "sepa-membership" ||
												selected.key === "visa-mastercard"
													? "Proposal will be available at the time of inquiry."
													: "PDF will be attached for this service. Once provided, clicking the card will open the PDF here using the browser's built-in viewer."}
											</p>
										</div>
									)}
								</div>
							) : (
								<div
									className={`${
										isExpanded
											? "hidden"
											: "rounded-xl border border-white/10 bg-white/5 p-4"
									}`}
								>
									<p
										className='text-sm text-gray-400'
										style={{ fontFamily: "var(--font-avenir)" }}
									>
										Select a service card above to open its PDF here.
									</p>
								</div>
							)}
						</div>
					</section>
				</main>
			</div>
		</ProtectedRoute>
	);
}
