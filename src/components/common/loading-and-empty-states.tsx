"use client";

import { motion } from "framer-motion";
import { COMMON_STYLES } from "@/constants/app-config";
import { fadeInUp, getTransition } from "@/lib/animations";

interface LoadingStateProps {
	message?: string;
}

export function LoadingState({ message = "読み込み中..." }: LoadingStateProps) {
	return (
		<motion.div
			className="text-center py-12"
			variants={fadeInUp}
			initial="initial"
			animate="animate"
			transition={getTransition()}
		>
			<div className="flex items-center justify-center mb-4">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
			</div>
			<p className={`${COMMON_STYLES.text.muted} text-lg`}>{message}</p>
		</motion.div>
	);
}

interface EmptyStateProps {
	title?: string;
	message: string;
	icon?: React.ReactNode;
}

export function EmptyState({ title, message, icon }: EmptyStateProps) {
	return (
		<motion.div
			className="text-center py-12"
			variants={fadeInUp}
			initial="initial"
			animate="animate"
			transition={getTransition()}
		>
			{icon && (
				<div className="flex justify-center mb-4 text-gray-500">{icon}</div>
			)}
			{title && (
				<h3 className={`text-xl ${COMMON_STYLES.text.subheading} mb-2`}>
					{title}
				</h3>
			)}
			<p className={`${COMMON_STYLES.text.muted} text-lg`}>{message}</p>
		</motion.div>
	);
}
