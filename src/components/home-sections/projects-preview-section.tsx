"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

import { ProjectCard } from "@/components/common/project-card";
import { LoadingState, EmptyState } from "@/components/common/loading-and-empty-states";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader, Container } from "@/components/layout/section";
import { useProjectsPreview } from "@/hooks/use-projects";
import { COMMON_STYLES } from "@/constants/app-config";
import { fadeInUp, getTransition } from "@/lib/animations";

export function ProjectsPreviewSection() {
	const { projects, isLoading, error } = useProjectsPreview();

	return (
		<Section>
			<Container>
				<SectionHeader title="Featured Projects" />

				{isLoading && <LoadingState message="プロジェクトを読み込み中..." />}
				
				{error && (
					<EmptyState 
						title="エラーが発生しました"
						message={error}
					/>
				)}

				{!isLoading && !error && projects.length === 0 && (
					<EmptyState 
						title="プロジェクトが見つかりません"
						message="現在表示できるプロジェクトはありません。"
					/>
				)}

				{!isLoading && !error && projects.length > 0 && (
					<>
						<div className={`${COMMON_STYLES.layout.grid} mb-12`}>
							{projects.map((project, index) => (
								<ProjectCard
									key={project.slug}
									project={project}
									index={index}
									variant="preview"
								/>
							))}
						</div>

						<motion.div
							className="text-center"
							variants={fadeInUp}
							initial="initial"
							whileInView="animate"
							transition={getTransition()}
							viewport={{ once: true }}
						>
							<Link href="/projects">
								<Button
									size="lg"
									className={`${COMMON_STYLES.gradients.button} text-white shadow-lg hover:shadow-xl transition-all duration-300`}
								>
									全てのプロジェクトを見る
									<ExternalLink className="w-4 h-4 ml-2" />
								</Button>
							</Link>
						</motion.div>
					</>
				)}
			</Container>
		</Section>
	);
}
