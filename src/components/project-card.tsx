"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ProjectWithContent } from "@/lib/mdx";

interface ProjectCardProps {
	project: ProjectWithContent;
	index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
	return (
		<motion.div
			key={project.slug}
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, delay: index * 0.2 }}
			viewport={{ once: true }}
			whileHover={{ scale: 1.05, y: -10 }}
			className="group h-full"
		>
			<Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-white/20 overflow-hidden h-full shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col">
				<div className="relative overflow-hidden">
					<img
						src={project.metadata.images[0]}
						alt={project.metadata.title}
						className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

					{project.metadata.images.length > 1 && (
						<div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
							+{project.metadata.images.length - 1} more
						</div>
					)}
				</div>
				<CardContent className="p-6 flex flex-col flex-1">
					<h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
						{project.metadata.title}
					</h3>
					<p className="text-gray-300 mb-4 text-sm leading-relaxed flex-1">
						{project.metadata.description}
					</p>

					{/* Tech tags with fixed height */}
					<div className="h-16 mb-4 overflow-hidden">
						<div className="flex flex-wrap gap-2">
							{project.metadata.tech.map((tech) => (
								<span
									key={tech}
									className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium"
								>
									{tech}
								</span>
							))}
						</div>
					</div>

					<Link href={`/projects/${project.slug}`} className="mt-auto">
						<Button className="text-white hover:bg-white/10 w-full group-hover:bg-blue-500/20 transition-colors">
							詳細を見る
							<ExternalLink className="w-4 h-4 ml-2" />
						</Button>
					</Link>
				</CardContent>
			</Card>
		</motion.div>
	);
}
