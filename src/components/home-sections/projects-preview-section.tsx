"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { getFeaturedProjectsAction } from "@/lib/actions";
import { type ProjectWithContent } from "@/lib/mdx";

export function ProjectsPreviewSection() {
	const [projects, setProjects] = useState<ProjectWithContent[]>([]);

	useEffect(() => {
		const fetchProjects = async () => {
			const projects = await getFeaturedProjectsAction();
			setProjects(projects);
		};
		fetchProjects();
	}, []);

	return (
		<motion.section
			className="py-20 px-4 md:px-8"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1 }}
			viewport={{ once: true }}
		>
			<div className="max-w-6xl mx-auto">
				<motion.h2
					className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
				>
					Featured Projects
				</motion.h2>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
					{projects.map((project, index) => (
						<ProjectCard key={project.slug} project={project} index={index} />
					))}
				</div>

				<motion.div
					className="text-center"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
				>
					<Link href="/projects">
						<Button
							size="lg"
							className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
						>
							全てのプロジェクトを見る
							<ExternalLink className="w-4 h-4 ml-2" />
						</Button>
					</Link>
				</motion.div>
			</div>
		</motion.section>
	);
}
