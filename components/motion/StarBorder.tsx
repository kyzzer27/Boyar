/** @format */

import "./StarBorder.css";
import { ReactNode, createElement } from "react";

interface StarBorderProps {
	as?: string;
	className?: string;
	color?: string;
	speed?: string;
	thickness?: number;
	children?: ReactNode;
	[key: string]: any;
}

const StarBorder = ({
	as: Component = "button",
	className = "",
	color = "white",
	speed = "6s",
	thickness = 1,
	children,
	...rest
}: StarBorderProps) => {
	return createElement(
		Component as any,
		{
			className: `star-border-container ${className}`,
			style: {
				...rest.style,
			},
			...rest,
		},
		createElement(
			"div",
			{
				className: "border-glow",
				style: {
					background: `radial-gradient(circle, ${color}, transparent 70%)`,
					animationDuration: speed,
				},
			}
		),
		createElement(
			"div",
			{ className: "inner-content" },
			children
		)
	);
};

export default StarBorder;
