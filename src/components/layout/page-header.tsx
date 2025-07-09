"use client";

import { motion } from "framer-motion";
import { COMMON_STYLES } from "@/constants/app-config";
import { fadeInUp, getTransition } from "@/lib/animations";

interface PageHeaderProps {
	title: string;
	subtitle?: string;
	children?: React.ReactNode;
}

export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
	return (
		<motion.div
			className="mb-12 text-center"
			variants={fadeInUp}
			initial="initial"
			animate="animate"
			transition={getTransition()}
		>
			<h1
				className={`text-4xl md:text-6xl ${COMMON_STYLES.text.heading} mb-4 ${COMMON_STYLES.gradients.text}`}
			>
				{title}
			</h1>
			{subtitle && (
				<p className={`text-xl ${COMMON_STYLES.text.subheading} mb-8`}>
					{subtitle}
				</p>
			)}
			{children}
		</motion.div>
	);
}
