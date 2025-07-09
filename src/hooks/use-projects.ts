import { useEffect, useState } from "react";
import { APP_CONFIG } from "@/constants/app-config";
import { getAllProjectsAction } from "@/lib/actions";
import type { ProjectWithContent } from "@/lib/mdx";

interface UseProjectsOptions {
	limit?: number;
	searchTerm?: string;
}

export function useProjects({
	limit,
	searchTerm = "",
}: UseProjectsOptions = {}) {
	const [projects, setProjects] = useState<ProjectWithContent[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				setIsLoading(true);
				setError(null);
				const allProjects = await getAllProjectsAction();

				let processedProjects = allProjects;

				// 検索フィルタリング
				if (searchTerm) {
					processedProjects = allProjects.filter(
						(project) =>
							project.metadata.title
								.toLowerCase()
								.includes(searchTerm.toLowerCase()) ||
							project.metadata.description
								.toLowerCase()
								.includes(searchTerm.toLowerCase()) ||
							project.metadata.tech.some((tech) =>
								tech.toLowerCase().includes(searchTerm.toLowerCase()),
							),
					);
				}

				// 制限がある場合は適用
				if (limit) {
					processedProjects = processedProjects.slice(0, limit);
				}

				setProjects(processedProjects);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "プロジェクトの取得に失敗しました",
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProjects();
	}, [limit, searchTerm]);

	return {
		projects,
		isLoading,
		error,
	};
}

// プレビュー用のプロジェクト取得フック
export function useProjectsPreview() {
	return useProjects({ limit: APP_CONFIG.projects.previewCount });
}
