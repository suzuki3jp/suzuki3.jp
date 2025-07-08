"use client";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MDXContent } from "@/components/mdx-content";
import { ProjectImageSlider } from "@/components/project-image-slider";
import { ProjectPeriod } from "@/components/project-period";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProjectContent } from "@/lib/actions";
import type { ProjectWithContent } from "@/lib/mdx";

interface ProjectDetailProps {
	params: Promise<{
		name: string;
	}>;
}

export default function ProjectDetailPage({ params }: ProjectDetailProps) {
	const [project, setProject] = useState<ProjectWithContent | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProject = async () => {
			try {
				const name = (await params).name;
				const projectData = await getProjectContent(name);
				setProject(projectData);
			} catch (error) {
				console.error("Error fetching project:", error);
				setProject(null);
			} finally {
				setLoading(false);
			}
		};

		fetchProject();
	}, [params]);

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center">
				<div className="text-white text-xl">Loading...</div>
			</div>
		);
	}

	if (!project) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center">
				<div className="text-white text-xl">Project not found</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
			<div className="container mx-auto px-4 py-8 max-w-4xl">
				{/* Header */}
				<motion.div
					className="mb-8"
					initial={{ opacity: 0, y: -30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<Link href="/projects">
						<Button
							variant="ghost"
							className="text-white hover:bg-white/10 mb-6"
						>
							<ArrowLeft className="w-4 h-4 mr-2" />
							プロジェクト一覧に戻る
						</Button>
					</Link>
				</motion.div>

				{/* Project Header */}
				<motion.div
					className="mb-8"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
						{project.metadata.title}
					</h1>

					<p className="text-xl text-gray-300 mb-6">
						{project.metadata.description}
					</p>

					{/* Project Meta */}
					<div className="flex flex-col gap-4 mb-6">
						{/* Project Period */}
						<ProjectPeriod
							startDate={project.metadata.startDate}
							endDate={project.metadata.endDate}
						/>

						<div className="flex flex-wrap gap-4 items-center">
							<div className="flex items-center gap-2 text-gray-400">
								<Users className="w-4 h-4" />
								<span>{project.metadata.team}</span>
							</div>
							<Badge
								className={`${
									project.metadata.status === "完成"
										? "bg-green-500/20 text-green-300"
										: "bg-yellow-500/20 text-yellow-300"
								}`}
							>
								{project.metadata.status}
							</Badge>
						</div>
					</div>

					{/* Tech Stack */}
					<div className="flex flex-wrap gap-2 mb-6">
						{project.metadata.tech.map((tech: string) => (
							<Badge
								key={tech}
								variant="secondary"
								className="bg-blue-500/20 text-blue-300 border-blue-500/30"
							>
								{tech}
							</Badge>
						))}
					</div>

					{/* Action Buttons */}
					<div className="flex gap-4 mb-8">
						{project.metadata.liveUrl && (
							<Button
								className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
								asChild
							>
								<a
									href={project.metadata.liveUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									<ExternalLink className="w-4 h-4 mr-2" />
									ライブデモ
								</a>
							</Button>
						)}
						{project.metadata.githubUrl && (
							<Button
								variant="outline"
								className="border-white/20 text-white hover:bg-white/10 bg-transparent"
								asChild
							>
								<a
									href={project.metadata.githubUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Github className="w-4 h-4 mr-2" />
									GitHub
								</a>
							</Button>
						)}
					</div>
				</motion.div>

				{/* Project Image */}
				<motion.div
					className="mb-8"
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					<ProjectImageSlider
						images={project.metadata.images}
						title={project.metadata.title}
					/>
				</motion.div>

				{/* MDX Content */}
				<div className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-xl p-8 border border-white/10 shadow-2xl">
					<MDXContent content={project.content} />
				</div>
			</div>
		</div>
	);
}
