"use client";

import { motion } from "framer-motion";
import { COMMON_STYLES } from "@/constants/app-config";
import { fadeInUp, getTransition } from "@/lib/animations";

interface SectionProps {
	children: React.ReactNode;
	className?: string;
	id?: string;
}

export function Section({ children, className = "", id }: SectionProps) {
	return (
		<motion.section
			id={id}
			className={`${COMMON_STYLES.layout.section} relative ${className}`}
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={getTransition()}
			viewport={{ once: true }}
		>
			{children}
		</motion.section>
	);
}

interface SectionHeaderProps {
	title: string;
	subtitle?: string;
	icon?: React.ReactNode;
}

export function SectionHeader({ title, subtitle, icon }: SectionHeaderProps) {
	return (
		<motion.div
			className="text-center mb-12"
			variants={fadeInUp}
			initial="initial"
			whileInView="animate"
			transition={getTransition()}
			viewport={{ once: true }}
		>
			{icon && (
				<div className="flex items-center justify-center mb-4">
					{icon}
					<span className={`${COMMON_STYLES.text.accent} font-medium ml-3`}>
						{subtitle}
					</span>
				</div>
			)}
			<h2 className={`text-4xl md:text-5xl ${COMMON_STYLES.text.heading} mb-4`}>
				{title}
			</h2>
			{subtitle && !icon && (
				<p className={`text-xl ${COMMON_STYLES.text.subheading}`}>{subtitle}</p>
			)}
		</motion.div>
	);
}

interface ContainerProps {
	children: React.ReactNode;
	className?: string;
	size?: "sm" | "md" | "lg" | "xl";
}

export function Container({
	children,
	className = "",
	size = "lg",
}: ContainerProps) {
	const sizeClasses = {
		sm: "max-w-2xl",
		md: "max-w-4xl",
		lg: "max-w-6xl",
		xl: "max-w-7xl",
	};

	return (
		<div className={`${sizeClasses[size]} mx-auto px-4 ${className}`}>
			{children}
		</div>
	);
}
