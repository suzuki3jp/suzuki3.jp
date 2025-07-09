"use client";

import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

import { SkillBadge } from "@/components/skill-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Section, SectionHeader, Container } from "@/components/layout/section";
import { SKILL_CATEGORIES } from "@/data/skills";
import { COMMON_STYLES } from "@/constants/app-config";
import { fadeInUp, fadeInLeft, getStaggerTransition } from "@/lib/animations";

export function TechStackSection() {
	return (
		<Section>
			<Container>
				<SectionHeader 
					title="Tech Stack" 
					subtitle="習熟度と共に技術スタックをご紹介"
					icon={<Code2 className={`w-8 h-8 ${COMMON_STYLES.text.accent}`} />}
				/>

				<div className={COMMON_STYLES.layout.grid}>
					{SKILL_CATEGORIES.map((category, categoryIndex) => (
						<motion.div
							key={category.category}
							variants={fadeInUp}
							initial="initial"
							whileInView="animate"
							transition={getStaggerTransition(categoryIndex)}
							viewport={{ once: true }}
							className={COMMON_STYLES.card.interactive}
						>
							<Card className={`${COMMON_STYLES.gradients.card} ${COMMON_STYLES.card.base} h-full`}>
								<CardContent className="p-6">
									<h3 className={`text-xl ${COMMON_STYLES.text.heading} mb-6 text-center group-hover:${COMMON_STYLES.text.accent} transition-colors`}>
										{category.category}
									</h3>
									<div className="space-y-4">
										{category.skills.map((skill, skillIndex) => (
											<motion.div
												key={skill.name}
												variants={fadeInLeft}
												initial="initial"
												whileInView="animate"
												transition={getStaggerTransition(skillIndex, 0.2)}
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
			</Container>
		</Section>
	);
}
