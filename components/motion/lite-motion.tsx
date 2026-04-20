/**
 * Zero-overhead drop-in replacement for framer-motion's `motion.*` components.
 *
 * Renders plain HTML elements immediately — no CSS animations, no JS-driven
 * transforms, no GPU composite layers. All framer-motion props (initial,
 * animate, transition, whileHover, etc.) are silently consumed and discarded.
 *
 * This eliminates the two main sources of lag on the investor content pages:
 *   1. Framer-motion's per-element JS overhead (inline transforms, style
 *      recalculations, GPU layers) on pages with 20-50+ motion.div elements.
 *   2. Staggered animation delays (e.g. delay: 0.3 + idx * 0.06) that keep
 *      content invisible for up to ~1s after mount, making pages feel slow.
 *
 * Usage — just change the import:
 *   - import { motion } from "framer-motion";
 *   + import { motion } from "@/components/motion/lite-motion";
 *
 * @format
 */

import React from "react";

interface MotionProps {
	initial?: Record<string, unknown>;
	animate?: Record<string, unknown>;
	transition?: Record<string, unknown>;
	whileHover?: Record<string, unknown>;
	whileTap?: Record<string, unknown>;
	whileInView?: Record<string, unknown>;
	viewport?: Record<string, unknown>;
	variants?: Record<string, unknown>;
	exit?: Record<string, unknown>;
	[key: string]: unknown;
}

/**
 * Creates a component that renders the given HTML tag directly, stripping
 * all framer-motion props. Zero animation overhead.
 */
function createLiteComponent(Tag: string) {
	const LiteComponent = React.forwardRef<HTMLElement, MotionProps>(
		(
			{
				initial,
				animate,
				transition,
				whileHover,
				whileTap,
				whileInView,
				viewport,
				variants,
				exit,
				...rest
			},
			ref
		) => {
			return React.createElement(Tag, { ref, ...rest });
		}
	);
	LiteComponent.displayName = `LiteMotion(${Tag})`;
	return LiteComponent;
}

/**
 * Drop-in `motion` proxy. Supports any HTML tag:
 *   motion.div, motion.span, motion.button, motion.p, motion.section, etc.
 *
 * Each element renders immediately as a plain HTML tag with zero animation.
 */
export const motion = new Proxy(
	{} as Record<string, ReturnType<typeof createLiteComponent>>,
	{
		get(cache, tag: string) {
			if (!cache[tag]) {
				cache[tag] = createLiteComponent(tag);
			}
			return cache[tag];
		},
	}
);

/**
 * No-op AnimatePresence — just renders children immediately.
 * Drop-in replacement for framer-motion's AnimatePresence.
 */
export function AnimatePresence({
	children,
}: {
	children?: React.ReactNode;
	mode?: string;
	initial?: boolean;
	onExitComplete?: () => void;
}) {
	return <>{children}</>;
}

