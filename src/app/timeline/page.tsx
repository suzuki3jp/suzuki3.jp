"use client";

import { motion } from "framer-motion";
import {
	ArrowLeft,
	Award,
	Briefcase,
	Code,
	ExternalLink,
	GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface TimelineEvent {
	startedAt: string;
	endedAt?: string;
	type: "award" | "project" | "work" | "education";
	title: string;
	description: string;
	externalLink?: string;
}

interface TimelineEventWithIcon extends TimelineEvent {
	icon: React.ComponentType<{ className?: string }>;
	color: string;
}

export default function TimelinePage() {
	const timelineData: TimelineEvent[] = [
		{
			startedAt: "2021",
			type: "education",
			title: "プログラミング学習開始",
			description:
				"独学でプログラミングを開始。最初は JavaScript で Discord Bot を開発。",
		},
		{
			startedAt: "2022",
			type: "education",
			title: "GitHub アカウント作成",
			description: "GitHub アカウントを作成した。",
			externalLink: "https://github.com/suzuki3jp",
		},
		{
			startedAt: "2024-10",
			type: "project",
			title: "Playlist Wizard 開発開始",
			description:
				"Playlist Wizard プロジェクトを開始。音楽プレイリストの管理と整理を目的としたアプリケーション。",
			externalLink: "/projects/playlistwizard",
		},
		{
			startedAt: "2025-04",
			type: "education",
			title: "情報科学専門学校 入学",
			description: "情報科学専門学校 情報セキュリティ学科に入学。",
		},
		{
			startedAt: "2025-06",
			type: "project",
			title: "GitHub Stats 開発開始",
			description:
				"GitHub Stats プロジェクトを開始。GitHub の統計情報を可視化するアプリケーション。",
			externalLink: "/projects/github-stats",
		},
	];
	const timelineEvents: TimelineEventWithIcon[] = timelineData
		.map((v) => {
			const iconMap: Record<
				string,
				React.ComponentType<{ className?: string }>
			> = {
				award: Award,
				project: Code,
				work: Briefcase,
				education: GraduationCap,
			};
			const colorMap: Record<string, string> = {
				award: "text-yellow-400",
				project: "text-blue-400",
				work: "text-green-400",
				education: "text-purple-400",
			};

			return {
				endedAt: "現在",
				...v,
				icon: iconMap[v.type],
				color: colorMap[v.type],
			};
		})
		.sort(
			(a, b) =>
				new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
		);

	const getTypeLabel = (type: string) => {
		switch (type) {
			case "award":
				return "受賞";
			case "project":
				return "プロジェクト";
			case "work":
				return "仕事";
			case "education":
				return "学習";
			default:
				return "";
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<motion.div
					className="mb-12"
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<Link href="/">
						<Button
							variant="ghost"
							className="text-white hover:bg-white/10 mb-6"
						>
							<ArrowLeft className="w-4 h-4 mr-2" />
							ホームに戻る
						</Button>
					</Link>

					<h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
						Timeline
					</h1>
					<p className="text-xl text-gray-300">開発履歴と受賞歴の時系列</p>
				</motion.div>

				{/* Timeline */}
				<div className="relative">
					{/* Timeline Line - アニメーション付き */}
					<motion.div
						className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-400"
						initial={{ height: 0 }}
						animate={{ height: "100%" }}
						transition={{ duration: 1.5, ease: "easeInOut" }}
					/>

					<div className="space-y-8">
						{timelineEvents.map((event, index) => (
							<motion.div
								key={index}
								className="relative flex items-start gap-8"
								initial={{ opacity: 0, x: -50 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
							>
								{/* Timeline Dot - アイコンと同時にアニメーション */}
								<motion.div
									className="relative z-10 flex items-center justify-center w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full border-4 border-white/20"
									initial={{ scale: 0, x: -50 }}
									animate={{ scale: 1, x: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
								>
									<event.icon className={`w-6 h-6 ${event.color}`} />
								</motion.div>

								{/* Content */}
								<div className="flex-1 pb-8">
									<motion.div whileHover={{ scale: 1.02 }} className="group">
										<Card className="bg-white/10 backdrop-blur-lg border-white/20 overflow-hidden">
											<CardContent className="p-6">
												<div className="flex items-center gap-4 mb-3">
													<span className="text-2xl font-bold text-white">
														{event.startedAt}
													</span>
													<span
														className={`px-2 py-1 rounded-full text-xs font-medium ${
															event.type === "award"
																? "bg-yellow-500/20 text-yellow-300"
																: event.type === "project"
																	? "bg-blue-500/20 text-blue-300"
																	: event.type === "work"
																		? "bg-green-500/20 text-green-300"
																		: "bg-purple-500/20 text-purple-300"
														}`}
													>
														{getTypeLabel(event.type)}
													</span>
												</div>

												<h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
													{event.title}
												</h3>

												<p className="text-gray-300 leading-relaxed">
													{event.description}
												</p>

												{event.externalLink && (
													<div className="mt-4">
														<Button
															variant="outline"
															size="sm"
															className="border-white/20 text-white hover:bg-white/10 bg-transparent"
															asChild
														>
															<a
																href={event.externalLink}
																target="_blank"
																rel="noopener noreferrer"
															>
																<ExternalLink className="w-4 h-4 mr-2" />
																詳細を見る
															</a>
														</Button>
													</div>
												)}
											</CardContent>
										</Card>
									</motion.div>
								</div>
							</motion.div>
						))}
					</div>
				</div>

				{/* Stats */}
				<motion.div
					className="mt-16 grid md:grid-cols-4 gap-6"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.5 }}
				>
					<Card className="bg-white/10 backdrop-blur-lg border-white/20 text-center">
						<CardContent className="p-6">
							<div className="text-3xl font-bold text-blue-400 mb-2">6+</div>
							<div className="text-gray-300">プロジェクト</div>
						</CardContent>
					</Card>

					<Card className="bg-white/10 backdrop-blur-lg border-white/20 text-center">
						<CardContent className="p-6">
							<div className="text-3xl font-bold text-green-400 mb-2">0</div>
							<div className="text-gray-300">受賞歴</div>
						</CardContent>
					</Card>

					<Card className="bg-white/10 backdrop-blur-lg border-white/20 text-center">
						<CardContent className="p-6">
							<div className="text-3xl font-bold text-purple-400 mb-2">4+</div>
							<div className="text-gray-300">開発経験年数</div>
						</CardContent>
					</Card>

					<Card className="bg-white/10 backdrop-blur-lg border-white/20 text-center">
						<CardContent className="p-6">
							<div className="text-3xl font-bold text-yellow-400 mb-2">10+</div>
							<div className="text-gray-300">使用技術</div>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</div>
	);
}
