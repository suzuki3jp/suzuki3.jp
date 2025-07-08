"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
	EmptyState,
	LoadingState,
} from "@/components/common/loading-and-empty-states";
import { ProjectCard } from "@/components/common/project-card";
import { SearchBar } from "@/components/common/search-bar";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/section";
import { COMMON_STYLES } from "@/constants/app-config";
import { useProjects } from "@/hooks/use-projects";
import { fadeInUp, getStaggerTransition } from "@/lib/animations";

export default function ProjectsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const { projects, isLoading, error } = useProjects({ searchTerm });

	return (
		<div className={`min-h-screen ${COMMON_STYLES.gradients.page}`}>
			<Container className="py-8">
				<PageHeader
					title="All Projects"
					subtitle="これまでに開発したプロジェクトの一覧です"
				>
					<SearchBar
						value={searchTerm}
						onChange={setSearchTerm}
						placeholder="プロジェクトを検索..."
					/>
				</PageHeader>

				{isLoading && <LoadingState message="プロジェクトを読み込み中..." />}

				{error && <EmptyState title="エラーが発生しました" message={error} />}

				{!isLoading && !error && projects.length === 0 && (
					<EmptyState
						title={
							searchTerm
								? "検索結果が見つかりません"
								: "プロジェクトが見つかりません"
						}
						message={
							searchTerm
								? `「${searchTerm}」に一致するプロジェクトはありません。`
								: "現在表示できるプロジェクトはありません。"
						}
					/>
				)}

				{!isLoading && !error && projects.length > 0 && (
					<motion.div
						className={COMMON_STYLES.layout.grid}
						variants={fadeInUp}
						initial="initial"
						animate="animate"
					>
						{projects.map((project, index) => (
							<motion.div
								key={project.slug}
								variants={fadeInUp}
								transition={getStaggerTransition(index)}
							>
								<ProjectCard project={project} index={index} variant="full" />
							</motion.div>
						))}
					</motion.div>
				)}
			</Container>
		</div>
	);
}
