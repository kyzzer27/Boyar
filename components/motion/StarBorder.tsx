/** @format */

import "./StarBorder.css";

const StarBorder = ({
	as: Component = "button",
	className = "",
	color = "white",
	speed = "6s",
	thickness = 1,
	children,
	...rest
}) => {
	return (
		<Component
			className={`star-border-container ${className}`}
			style={{
				...rest.style,
			}}
			{...rest}
		>
			<div
				className='border-glow'
				style={{
					background: `radial-gradient(circle, ${color}, transparent 70%)`,
					animationDuration: speed,
				}}
			></div>
			<div className='inner-content'>{children}</div>
		</Component>
	);
};

export default StarBorder;
