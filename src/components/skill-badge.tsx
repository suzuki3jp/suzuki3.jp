"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface SkillBadgeProps {
	skill: string;
	proficiency: number; // 0-100
	className?: string;
}

export function SkillBadge({
	skill,
	proficiency,
	className = "",
}: SkillBadgeProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<motion.div
			className={`relative ${className}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			whileHover={{ scale: 1.02 }}
		>
			<div className="relative px-4 py-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20 overflow-hidden backdrop-blur-sm">
				{/* プログレスバー背景 */}
				<div className="absolute inset-0 bg-gray-800/30 rounded-lg" />

				{/* プログレスバー */}
				<motion.div
					className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-lg"
					initial={{ width: 0 }}
					whileInView={{ width: `${proficiency}%` }}
					transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
					viewport={{ once: true }}
				/>

				{/* コンテンツ */}
				<div className="relative z-10 flex items-center justify-between">
					<span className="text-white font-medium">{skill}</span>
					<span className="text-blue-300 text-sm font-bold">
						{proficiency}%
					</span>
				</div>
			</div>

			{/* ホバー時のツールチップ */}
			<motion.div
				className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg whitespace-nowrap border border-white/10"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
				transition={{ duration: 0.2 }}
				style={{ pointerEvents: "none" }}
			>
				習熟度: {proficiency}/100
				<div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800" />
			</motion.div>
		</motion.div>
	);
}
