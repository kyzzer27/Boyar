"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const pricingButtons = [
	{
		id: "company-formation",
		label: "Company formation",
		route: "/pricing/company-formation/table",
		description: "Corporate structuring and registration services",
	},
	{
		id: "trust-foundations",
		label: "Trust & Foundation",
		route: "/pricing/trust-foundations",
		description: "Trust and foundation establishment services",
	},
	{
		id: "trustee-services",
		label: "Trustee services",
		route: "/pricing/trustee-services",
		description: "Professional trustee and administration",
	},
	{
		id: "banking",
		label: "Banking",
		route: "/pricing/banking",
		description: "Banking solutions and account services",
	},
	{
		id: "on-quote",
		label: "On quote - Pricing",
		route: "/pricing/on-quote",
		description: "Custom pricing and quote requests",
	},
];

interface PricingButtonProps {
	button: typeof pricingButtons[0];
	index: number;
	mounted: boolean;
	hoveredButton: string | null;
	setHoveredButton: (id: string | null) => void;
	router: ReturnType<typeof useRouter>;
}

function PricingButton({ button, index, mounted, hoveredButton, setHoveredButton, router }: PricingButtonProps) {
	const buttonRef = useRef<HTMLDivElement>(null);
	const [circumference, setCircumference] = useState(0);
	const [radius, setRadius] = useState(0);

	useEffect(() => {
		if (buttonRef.current && mounted) {
			const width = buttonRef.current.offsetWidth;
			const r = width / 2 - 2;
			setRadius(r);
			setCircumference(2 * Math.PI * r);
		}
	}, [mounted]);

	return (
		<motion.button
			initial={{ opacity: 0, y: 30 }}
			animate={mounted ? { opacity: 1, y: 0 } : {}}
			transition={{
				duration: 0.5,
				delay: index * 0.08,
				ease: "easeOut",
			}}
			whileHover={{
				y: -8,
				transition: { duration: 0.3 },
			}}
			whileTap={{ scale: 0.97 }}
			onMouseEnter={() => {
				setHoveredButton(button.id);
			}}
			onMouseLeave={() => {
				setHoveredButton(null);
			}}
			onClick={() => router.push(button.route)}
			className='group relative h-full flex justify-center'
			style={{ fontFamily: "var(--font-benzin)" }}
		>
			<div 
				ref={buttonRef}
				className='relative w-full aspect-square max-w-[280px] mx-auto rounded-full border border-white/10 bg-gradient-to-br from-white/8 to-white/3 p-8 transition-all duration-300 hover:border-white/20 hover:from-white/12 hover:to-white/8 flex flex-col items-center justify-center'
			>
				{/* Full circular border with wipe animation */}
				{circumference > 0 && radius > 0 && (
					<svg 
						className='absolute inset-0 w-full h-full pointer-events-none' 
						style={{ transform: 'rotate(-90deg)', zIndex: 5 }}
						viewBox={`0 0 ${radius * 2 + 4} ${radius * 2 + 4}`}
						preserveAspectRatio="xMidYMid meet"
					>
						<motion.circle
							cx={(radius * 2 + 4) / 2}
							cy={(radius * 2 + 4) / 2}
							r={radius}
							fill="none"
							stroke="#3b82f6"
							strokeWidth="2"
							strokeLinecap="round"
							strokeDasharray={circumference}
							strokeDashoffset={hoveredButton === button.id ? 0 : circumference}
							initial={false}
							animate={{
								strokeDashoffset: hoveredButton === button.id ? 0 : circumference
							}}
							transition={{
								duration: 0.6,
								ease: "easeInOut",
							}}
						/>
					</svg>
				)}

				{/* Content */}
				<div className='space-y-3 text-center relative z-10'>
					<h3 className='text-lg sm:text-xl font-bold text-white leading-snug group-hover:text-blue-200 transition-colors duration-300'>
						{button.label}
					</h3>
					<div className='w-8 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300 mx-auto'></div>
				</div>

				{/* Enhanced Hover glow effect */}
				<div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0'>
					<div className='absolute top-1/4 left-1/4 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl -translate-y-1/2'></div>
					<div className='absolute bottom-1/4 right-1/4 w-40 h-40 bg-cyan-500/15 rounded-full blur-3xl translate-y-1/2'></div>
					<div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 rounded-full'></div>
				</div>
			</div>
		</motion.button>
	);
}

export default function PricingPage() {
	const router = useRouter();
	const [mounted, setMounted] = useState(false);
	const [hoveredButton, setHoveredButton] = useState<string | null>(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<ProtectedRoute>
			<div className='relative min-h-screen bg-black text-white'>
				{/* Subtle Background */}
				<div className='fixed inset-0 -z-10 overflow-hidden pointer-events-none'>
					<div className='absolute -top-32 -right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl'></div>
					<div className='absolute -bottom-28 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl'></div>
				</div>

				{/* Header */}
				<header className='sticky top-0 bg-black/85 backdrop-blur-sm border-b border-white/10 z-30'>
					<div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8'>
						<button
							onClick={() => router.back()}
							className='text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 font-medium'
							style={{ fontFamily: "var(--font-benzin)" }}
						>
							← Back
						</button>
						<h1
							className='text-2xl sm:text-3xl font-semibold text-white'
							style={{ fontFamily: "var(--font-benzin)" }}
						>
							Pricing Tool
						</h1>
						<div className='w-8' aria-hidden='true'></div>
					</div>
				</header>

				{/* Main Content */}
				<main className='relative z-10 py-16 sm:py-20'>
					<section className='relative mx-auto max-w-6xl px-6 sm:px-8'>
						{/* Introduction */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={mounted ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
							className='mb-12 sm:mb-16 text-center'
						>
							<p className='text-gray-400 text-sm sm:text-base leading-relaxed'>
								Select a pricing category to view detailed pricing information and configurations
							</p>
						</motion.div>

						{/* Circular Buttons Grid */}
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6'>
							{pricingButtons.map((button, index) => (
								<PricingButton
									key={button.id}
									button={button}
									index={index}
									mounted={mounted}
									hoveredButton={hoveredButton}
									setHoveredButton={setHoveredButton}
									router={router}
								/>
							))}
						</div>
					</section>
				</main>
			</div>
		</ProtectedRoute>
	);
}
