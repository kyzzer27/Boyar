/** @format */

"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface ExpenditureButton {
	id: string;
	label: string;
	description?: string;
}
const expenditureButtons: ExpenditureButton[] = [
	{ id: "initial-month-cost", label: "Initial Month Cost" },
	{ id: "monthly-cost", label: "Monthly Cost" },
	{ id: "burn-rate-summary", label: "Runway Projection" },
	{ id: "brief-assessment", label: "Burn Rate Assessment" },
	{ id: "category-wise-spend", label: "Category-Wise Spend Allocation" },
	{ id: "variance-tracker", label: "Variance Tracker" },
];

interface ExpenditureDashboardProps {
	onButtonClick?: (buttonId: string) => void;
	onClose?: () => void;
}

export function ExpenditureDashboard({
	onButtonClick,
	onClose,
}: ExpenditureDashboardProps) {
	const router = useRouter();

	const handleCardClick = useCallback(
		(cardId: string) => {
			if (cardId === "monthly-cost") {
				router.push("/expenditure/monthly-cost");
			} else if (cardId === "category-wise-spend") {
				router.push("/expenditure/category-wise-spend-allocation");
			} else if (cardId === "variance-tracker") {
				router.push("/expenditure/variance-tracker");
			} else {
				onButtonClick?.(cardId);
			}
		},
		[router, onButtonClick],
	);

	return (
		<div className="fixed inset-0 z-50 bg-black">

			<header className="border-b border-white/10 bg-black relative z-10">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
					<button
						onClick={() => onClose?.() || router.back()}
						className="text-sm sm:text-base text-white hover:text-gray-300 transition"
					>
						← Back
					</button>
					<h1
						className="text-sm sm:text-xl md:text-2xl font-medium text-white truncate min-w-0 mx-2"
						style={{ fontFamily: "var(--font-benzin)" }}
					>
						Expenditure Dashboard
					</h1>
					<div className="w-8 sm:w-20 flex-shrink-0" />
				</div>
			</header>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
				className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 pt-24 sm:pt-28"
			>
				<motion.div
					initial={{ opacity: 0, scale: 0.96, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
					className="relative w-full max-w-5xl max-h-[85vh] overflow-y-auto bg-black border border-white/10 rounded-2xl shadow-2xl p-4 sm:p-8 md:p-10"
					style={{
						boxShadow:
							"0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
					}}
				>
					{/* Panel Header */}
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.1 }}
						className="mb-8 sm:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0"
					>
						<div>
							<h2
								className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-2"
								style={{
									fontFamily:
										"Inter, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
								}}
							>
								Expenditure Dashboard
							</h2>
							<p className="text-slate-400 text-sm sm:text-base">
								Select a category to view detailed financial insights
							</p>
						</div>

						<motion.a
							href="/files/Boyar_Partners_Expenditure_2026_v4.xlsx"
							download="Boyar_Partners_Expenditure_2026_v4.xlsx"
							className="group relative px-6 py-2.5 rounded-xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 text-center flex flex-col items-center justify-center tracking-wide transition-all duration-300 hover:border-white/20 hover:from-white/12 hover:to-white/8 shadow-[0_0_12px_rgba(59,130,246,0.10),0_0_30px_rgba(59,130,246,0.05)] hover:shadow-[0_0_15px_rgba(59,130,246,0.3),0_0_30px_rgba(59,130,246,0.15)]"
							style={{
								fontFamily:
									"Inter, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
							}}
							whileHover={{
								scale: 1.05,
								transition: { duration: 0.3 },
							}}
						>
							<div className="relative z-10 w-full flex flex-col items-center">
								<span className="leading-snug text-sm font-medium text-white group-hover:text-blue-200 transition-colors duration-300">
									Download in excel
								</span>
								<div className="mt-1 w-6 h-[1.5px] bg-gradient-to-r from-blue-500 to-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300 mx-auto rounded-full" />
							</div>

							<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden rounded-xl z-0">
								<div className="absolute top-1/4 left-1/4 w-12 h-12 bg-blue-500/20 rounded-full blur-xl -translate-y-1/2" />
								<div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-cyan-500/20 rounded-full blur-xl translate-y-1/2" />
							</div>
						</motion.a>
					</motion.div>

					{/* Buttons Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8">
						{expenditureButtons.map((button, index) => (
							<motion.button
								key={button.id}
								initial={{ opacity: 0, y: 12 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.35,
									delay: 0.1 + index * 0.06,
									ease: [0.16, 1, 0.3, 1],
								}}
								onClick={() => handleCardClick(button.id)}
								className="exp-btn group relative p-6 sm:p-7 md:p-8 bg-black rounded-xl text-left"
								style={{
									border: "1px solid rgba(255, 255, 255, 0.08)",
								}}
							>
								{/* SVG Border Wipe — GPU-accelerated via will-change */}
								<svg
									className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
									style={{ borderRadius: "inherit", overflow: "hidden" }}
									preserveAspectRatio="none"
								>
									<rect
										x="1"
										y="1"
										rx="11"
										ry="11"
										fill="none"
										pathLength={100}
										strokeDasharray="100"
										strokeWidth={1.8}
										stroke="rgba(59, 130, 246, 0.85)"
										strokeLinecap="round"
										className="exp-border-rect"
										style={{
											width: "calc(100% - 2px)",
											height: "calc(100% - 2px)",
										}}
									/>
								</svg>

								{/* Content */}
								<div className="relative z-10">
									<h3
										className="exp-btn-title text-white font-semibold text-base sm:text-lg md:text-xl mb-1"
										style={{
											fontFamily:
												"Inter, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
										}}
									>
										{button.label}
									</h3>
									<div className="mt-1.5 w-8 h-[1.5px] bg-gradient-to-r from-blue-500 to-cyan-400 opacity-40 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
									{button.id !== "alerts-flags" &&
										button.description && (
											<p className="text-slate-400 text-xs mt-2 leading-relaxed">
												{button.description}
											</p>
										)}
								</div>

								{/* Arrow Icon */}
								<div className="exp-btn-arrow absolute top-6 right-6 text-slate-400">
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</div>
							</motion.button>
						))}
					</div>

					{/* Disclaimer Button */}
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.7 }}
						className="flex justify-center"
					>
						<motion.button
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.35,
								delay: 0.7,
								ease: [0.16, 1, 0.3, 1],
							}}
							onClick={() => onButtonClick?.("disclaimer")}
							className="exp-btn group relative px-8 py-4 bg-black rounded-xl text-center"
							style={{
								border: "1px solid rgba(255, 255, 255, 0.08)",
							}}
						>
							{/* SVG Border Wipe */}
							<svg
								className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
								style={{ borderRadius: "inherit", overflow: "hidden" }}
								preserveAspectRatio="none"
							>
								<rect
									x="1"
									y="1"
									rx="11"
									ry="11"
									fill="none"
									pathLength={100}
									strokeDasharray="100"
									strokeWidth={1.8}
									stroke="rgba(59, 130, 246, 0.85)"
									strokeLinecap="round"
									className="exp-border-rect"
									style={{
										width: "calc(100% - 2px)",
										height: "calc(100% - 2px)",
									}}
								/>
							</svg>

							<div className="relative z-10">
								<h3
									className="exp-btn-title text-white font-semibold text-base sm:text-lg md:text-xl"
									style={{
										fontFamily:
											"Inter, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
									}}
								>
									Disclaimer
								</h3>
								<div className="mt-1.5 w-8 h-[1.5px] bg-gradient-to-r from-blue-500 to-cyan-400 opacity-40 group-hover:opacity-100 transition-opacity duration-300 mx-auto rounded-full" />
							</div>
						</motion.button>
					</motion.div>
				</motion.div>
			</motion.div>

			<style jsx global>{`
				.exp-btn {
					position: relative;
					overflow: hidden;
					transform: translateZ(0);
					transition:
						box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
						transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
					box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
				}
				.exp-btn:hover {
					box-shadow:
						0 4px 24px rgba(59, 130, 246, 0.35),
						0 0 40px rgba(59, 130, 246, 0.12),
						0 8px 25px rgba(0, 0, 0, 0.15);
					transform: translateZ(0) translateY(-2px);
				}
				.exp-border-rect {
					stroke-dashoffset: 100;
					transition: stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1);
				}
				.exp-btn:hover .exp-border-rect {
					stroke-dashoffset: 0;
				}
				.exp-btn-title {
					transition: color 0.3s ease;
				}
				.exp-btn:hover .exp-btn-title {
					color: #E0E7FF;
				}
				.exp-btn-arrow {
					transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), color 0.3s ease;
				}
				.exp-btn:hover .exp-btn-arrow {
					transform: translateX(4px);
					color: #60a5fa;
				}
			`}</style>
		</div>
	);
}
