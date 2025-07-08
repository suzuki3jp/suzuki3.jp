"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { APP_CONFIG, COMMON_STYLES } from "@/constants/app-config";
import { cardHover, fadeInUp, getStaggerTransition } from "@/lib/animations";
import type { ProjectWithContent } from "@/lib/mdx";

interface ProjectCardProps {
	project: ProjectWithContent;
	index: number;
	variant?: "preview" | "full";
}

export function ProjectCard({
	project,
	index,
	variant = "preview",
}: ProjectCardProps) {
	const showGithubButton = variant === "full" && project.metadata.githubUrl;
	const imageCount = project.metadata.images?.length || 0;

	return (
		<motion.div
			variants={fadeInUp}
			initial="initial"
			whileInView="animate"
			transition={getStaggerTransition(index)}
			viewport={{ once: true }}
			whileHover={cardHover}
			className={`${COMMON_STYLES.card.interactive} h-full`}
		>
			<Card
				className={`${COMMON_STYLES.gradients.card} ${COMMON_STYLES.card.base} overflow-hidden h-full flex flex-col`}
			>
				{/* Image Section */}
				<div className="relative overflow-hidden">
					<img
						src={project.metadata.images?.[0] || "/placeholder.svg"}
						alt={project.metadata.title}
						className={`w-full ${APP_CONFIG.projects.imageHeight} object-cover transition-transform duration-500 group-hover:scale-110`}
					/>

					{/* Image Overlay */}
					<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

					{/* Status Badge */}
					{variant === "full" && project.metadata.status && (
						<div className="absolute top-4 right-4 flex gap-2">
							<span
								className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
									project.metadata.status === "完成"
										? "bg-green-500/30 text-green-200"
										: "bg-yellow-500/30 text-yellow-200"
								}`}
							>
								{project.metadata.status}
							</span>
						</div>
					)}

					{/* Multiple Images Indicator */}
					{imageCount > 1 && (
						<div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
							+{imageCount - 1} more
						</div>
					)}
				</div>

				{/* Content Section */}
				<CardContent className="p-6 flex flex-col flex-1">
					<h3
						className={`text-xl ${COMMON_STYLES.text.heading} mb-2 group-hover:${COMMON_STYLES.text.accent} transition-colors`}
					>
						{project.metadata.title}
					</h3>

					<p
						className={`${COMMON_STYLES.text.subheading} mb-4 text-sm leading-relaxed flex-1`}
					>
						{project.metadata.description}
					</p>

					{/* Project Period (Full variant only) */}
					{variant === "full" && project.metadata.startDate && (
						<div className="mb-4">
							{/* ProjectPeriod component would be used here */}
						</div>
					)}

					{/* Tech Stack */}
					<div className="flex flex-wrap gap-2 mb-4 h-16 content-start overflow-hidden">
						{project.metadata.tech.map((tech) => (
							<span
								key={tech}
								className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium h-fit"
							>
								{tech}
							</span>
						))}
					</div>

					{/* Action Buttons */}
					<div className={`flex gap-2 mt-auto ${showGithubButton ? "" : ""}`}>
						<Link href={`/projects/${project.slug}`} className="flex-1">
							<Button
								variant="ghost"
								className="text-white hover:bg-white/10 w-full group-hover:bg-blue-500/20 transition-colors"
							>
								詳細を見る
								<ExternalLink className="w-4 h-4 ml-2" />
							</Button>
						</Link>

						{showGithubButton && (
							<Button
								size="icon"
								variant="ghost"
								className="text-white hover:bg-white/10 group-hover:bg-blue-500/20 transition-colors"
								asChild
							>
								<a
									href={project.metadata.githubUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Github className="w-4 h-4" />
								</a>
							</Button>
						)}
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
