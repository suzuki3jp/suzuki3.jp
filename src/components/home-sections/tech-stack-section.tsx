"use client";

import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

import { SkillBadge } from "@/components/skill-badge";
import { Card, CardContent } from "@/components/ui/card";
import { SKILL_CATEGORIES } from "@/data/skills";

export function TechStackSection() {
	return (
		<motion.section
			className="py-20 px-4 md:px-8 relative"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1 }}
			viewport={{ once: true }}
		>
			<div className="max-w-6xl mx-auto">
				<motion.div
					className="text-center mb-12"
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
				>
					<div className="flex items-center justify-center mb-4">
						<Code2 className="w-8 h-8 text-blue-400 mr-3" />
						<span className="text-blue-400 font-medium">My Skills</span>
					</div>
					<h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
						Tech Stack
					</h2>
					<p className="text-xl text-gray-300">
						習熟度と共に技術スタックをご紹介
					</p>
				</motion.div>

				<div className="grid md:grid-cols-3 gap-8">
					{SKILL_CATEGORIES.map((category, categoryIndex) => (
						<motion.div
							key={category.category}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
							viewport={{ once: true }}
							className="group"
						>
							<Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-white/20 h-full shadow-xl hover:shadow-2xl transition-all duration-300">
								<CardContent className="p-6">
									<h3 className="text-xl font-bold text-white mb-6 text-center group-hover:text-blue-400 transition-colors">
										{category.category}
									</h3>
									<div className="space-y-4">
										{category.skills.map((skill, skillIndex) => (
											<motion.div
												key={skill.name}
												initial={{ opacity: 0, x: -20 }}
												whileInView={{ opacity: 1, x: 0 }}
												transition={{
													duration: 0.6,
													delay: categoryIndex * 0.2 + skillIndex * 0.1,
												}}
												viewport={{ once: true }}
											>
												<SkillBadge
													skill={skill.name}
													proficiency={skill.proficiency}
													className="w-full"
												/>
											</motion.div>
										))}
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</motion.section>
	);
}
