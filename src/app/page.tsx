"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
	ChevronDown,
	Code2,
	ExternalLink,
	Github,
	Mail,
	Sparkles,
	Twitter,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { SkillBadge } from "@/components/skill-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTypingAnimation } from "@/hooks/use-typing-animation";
import { getAllProjectsAction } from "@/lib/actions";
import type { ProjectWithContent } from "@/lib/mdx";

// 技術スタック（カテゴリ別）
const SKILL_CATEGORIES = [
	{
		category: "Frontend",
		skills: [
			{ name: "React", proficiency: 70 },
			{ name: "Next.js", proficiency: 80 },
			{ name: "TypeScript", proficiency: 80 },
			{ name: "Tailwind CSS", proficiency: 30 },
		],
	},
	{
		category: "Backend",
		skills: [
			{ name: "Node.js", proficiency: 80 },
			{ name: "Express.js", proficiency: 30 },
			{ name: "Python", proficiency: 50 },
			{ name: "Go", proficiency: 20 },
			{ name: "Rust", proficiency: 10 },
			{ name: "SQLite", proficiency: 10 },
		],
	},
	{
		category: "Tools & Others",
		skills: [
			{ name: "Supabase", proficiency: 50 },
			{ name: "Docker", proficiency: 30 },
		],
	},
] as const;

export default function HomePage() {
	const names = ["suzuki3jp", "森 滉樹", "Kouki Mori"];
	const displayText = useTypingAnimation(names, 2000, 150, 75);
	const [projects, setProjects] = useState<ProjectWithContent[]>([]);

	const { scrollYProgress } = useScroll();
	const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
	const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

	useEffect(() => {
		const fetchProjects = async () => {
			const allProjects = await getAllProjectsAction();
			setProjects(allProjects.slice(0, 3));
		};
		fetchProjects();
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
			{/* Hero Section */}
			<motion.section
				className="relative h-screen flex items-center justify-center overflow-hidden"
				style={{ y, opacity }}
			>
				{/* Background Effects */}
				<div className="absolute inset-0">
					<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
					<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
				</div>

				<div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1 }}
						className="mb-8"
					>
						<div className="flex items-center justify-center mb-4">
							<Sparkles className="w-8 h-8 text-blue-400 mr-3" />
							<span className="text-blue-400 font-medium">
								Welcome to my portfolio
							</span>
						</div>

						<h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
							<span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
								{displayText}
								<motion.span
									animate={{ opacity: [1, 0] }}
									transition={{
										duration: 0.8,
										repeat: Number.POSITIVE_INFINITY,
										repeatType: "reverse",
									}}
									className="text-blue-400"
								>
									|
								</motion.span>
							</span>
						</h1>

						<p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
							Student Developer & Otaku
							<br />
							<span className="text-lg text-gray-400">
								日頃のちょっとした不便をテクノロジーで解決
							</span>
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 0.5 }}
						className="flex flex-wrap justify-center gap-4 mb-12"
					>
						<Button
							size="lg"
							className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0"
						>
							<Github className="w-5 h-5 mr-2" />
							GitHub
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="border-white/20 text-white hover:bg-white/10 bg-transparent"
						>
							<Twitter className="w-5 h-5 mr-2" />
							Twitter
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="border-white/20 text-white hover:bg-white/10 bg-transparent"
						>
							<Mail className="w-5 h-5 mr-2" />
							Contact
						</Button>
					</motion.div>
				</div>

				<motion.div
					className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
					animate={{ y: [0, 10, 0] }}
					transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
				>
					<ChevronDown className="w-8 h-8 text-white/60" />
				</motion.div>
			</motion.section>

			{/* About Section */}
			<motion.section
				className="py-20 px-4 md:px-8 relative"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 1 }}
				viewport={{ once: true }}
			>
				<div className="max-w-4xl mx-auto">
					<motion.h2
						className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						About Me
					</motion.h2>

					<motion.div
						className="relative backdrop-blur-lg bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 shadow-2xl"
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						<div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500/20 rounded-full blur-xl" />
						<div className="absolute -bottom-4 -right-4 w-8 h-8 bg-cyan-500/20 rounded-full blur-xl" />

						<p className="text-lg text-gray-300 leading-relaxed">
							日頃感じているちょっとした不便を解決するために、個人開発を行っています。
							主に TypeScript を使用してきましたが、今後 Go や Rust
							などの言語にも挑戦していきたいと考えています。
							新しいことを知ることが好きで、小さいころから知的探求心が旺盛です。
						</p>
					</motion.div>
				</div>
			</motion.section>

			{/* Tech Stack Section */}
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

			{/* Projects Preview */}
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
							<motion.div
								key={project.slug}
								initial={{ opacity: 0, y: 50 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: index * 0.2 }}
								viewport={{ once: true }}
								whileHover={{ scale: 1.05, y: -10 }}
								className="group"
							>
								<Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-white/20 overflow-hidden h-full shadow-xl hover:shadow-2xl transition-all duration-300">
									<div className="relative overflow-hidden">
										<img
											src={project.metadata.image || "/placeholder.svg"}
											alt={project.metadata.title}
											className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									</div>
									<CardContent className="p-6">
										<h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
											{project.metadata.title}
										</h3>
										<p className="text-gray-300 mb-4 text-sm leading-relaxed">
											{project.metadata.description}
										</p>
										<div className="flex flex-wrap gap-2 mb-4">
											{project.metadata.tech.map((tech) => (
												<span
													key={tech}
													className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium"
												>
													{tech}
												</span>
											))}
										</div>
										<Link href={`/projects/${project.slug}`}>
											<Button
												variant="ghost"
												className="text-white hover:bg-white/10 w-full group-hover:bg-blue-500/20 transition-colors"
											>
												詳細を見る
												<ExternalLink className="w-4 h-4 ml-2" />
											</Button>
										</Link>
									</CardContent>
								</Card>
							</motion.div>
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
		</div>
	);
}
