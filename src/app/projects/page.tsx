"use client";
import { motion } from "framer-motion";
import { ExternalLink, Github, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ProjectPeriod } from "@/components/project-period";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getAllProjectsAction } from "@/lib/actions";
import type { ProjectWithContent } from "@/lib/mdx";

export default function ProjectsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [projects, setProjects] = useState<ProjectWithContent[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchProjects = async () => {
			const allProjects = await getAllProjectsAction();
			setProjects(allProjects);
			setIsLoading(false);
		};
		fetchProjects();
	}, []);

	const filteredProjects = projects.filter(
		(project) =>
			project.metadata.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			project.metadata.description
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			project.metadata.tech.some((tech) =>
				tech.toLowerCase().includes(searchTerm.toLowerCase()),
			),
	);

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<motion.div
					className="mb-12 text-center"
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
						All Projects
					</h1>
					<p className="text-xl text-gray-300 mb-8">
						これまでに開発したプロジェクトの一覧です
					</p>

					{/* Search */}
					<div className="max-w-md mx-auto relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
						<Input
							placeholder="プロジェクトを検索..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
						/>
					</div>
				</motion.div>

				{/* Projects Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{filteredProjects.map((project, index) => (
						<motion.div
							key={project.slug}
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: index * 0.1 }}
							whileHover={{ scale: 1.02, y: -5 }}
							className="group"
						>
							<Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-white/20 overflow-hidden h-full shadow-xl hover:shadow-2xl transition-all duration-300">
								<div className="relative overflow-hidden">
									<img
										src={project.metadata.images[0]}
										alt={project.metadata.title}
										className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
									/>
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

									{project.metadata.images.length > 1 && (
										<div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
											+{project.metadata.images.length - 1} more
										</div>
									)}

									<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								</div>

								<CardContent className="p-6 flex flex-col">
									<h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
										{project.metadata.title}
									</h3>
									<p className="text-gray-300 mb-4 flex-grow text-sm leading-relaxed">
										{project.metadata.description}
									</p>

									{/* Project Period */}
									<ProjectPeriod
										startDate={project.metadata.startDate}
										endDate={project.metadata.endDate}
										className="mb-4"
									/>

									<div className="flex flex-wrap gap-2 mb-6">
										{project.metadata.tech.map((tech) => (
											<span
												key={tech}
												className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium"
											>
												{tech}
											</span>
										))}
									</div>

									<div className="flex gap-2 mt-auto">
										<Link href={`/projects/${project.slug}`} className="flex-1">
											<Button
												variant="ghost"
												className="text-white hover:bg-white/10 w-full group-hover:bg-blue-500/20 transition-colors"
											>
												詳細を見る
												<ExternalLink className="w-4 h-4 ml-2" />
											</Button>
										</Link>
										{project.metadata.githubUrl && (
											<Button
												variant="ghost"
												size="icon"
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
					))}
				</div>

				{isLoading && (
					<motion.div
						className="text-center py-12"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						<p className="text-gray-400 text-lg">プロジェクトを読み込み中...</p>
					</motion.div>
				)}

				{!isLoading && filteredProjects.length === 0 && (
					<motion.div
						className="text-center py-12"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						<p className="text-gray-400 text-lg">
							検索条件に一致するプロジェクトが見つかりませんでした。
						</p>
					</motion.div>
				)}
			</div>
		</div>
	);
}
