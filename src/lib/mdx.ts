import fs from "fs";
import matter from "gray-matter";
import path from "path";

const projectsDirectory = path.join(process.cwd(), "src", "projects");

export interface ProjectMetadata {
	title: string;
	description: string;
	tech: string[];
	images: string[];
	status: string;
	startDate: string;
	endDate?: string;
	team: string;
	featured?: boolean;
	githubUrl?: string;
	liveUrl?: string;
}

export interface ProjectWithContent {
	metadata: ProjectMetadata;
	content: string;
	slug: string;
}

// 開発環境：MDXファイルから直接読み込み
function getAllProjectsFromMDX(): ProjectWithContent[] {
	try {
		if (!fs.existsSync(projectsDirectory)) {
			return [];
		}

		const filenames = fs.readdirSync(projectsDirectory);
		const projects = filenames
			.filter((name) => name.endsWith(".mdx"))
			.map((filename) => {
				const slug = filename.replace(/\.mdx$/, "");
				const filePath = path.join(projectsDirectory, filename);
				const fileContent = fs.readFileSync(filePath, "utf8");
				const { data, content } = matter(fileContent);

				return {
					metadata: data as ProjectMetadata,
					content,
					slug,
				};
			});

		// 開始日でソート（新しいものから）
		return projects.sort(
			(a, b) =>
				new Date(b.metadata.startDate).getTime() -
				new Date(a.metadata.startDate).getTime(),
		);
	} catch (error) {
		console.error("Error reading MDX files:", error);
		return [];
	}
}

// 本番環境：生成されたTypeScriptファイルから読み込み
function getAllProjectsFromGenerated(): ProjectWithContent[] {
	try {
		const { projects } = require("@/data/generated-projects");
		return projects as ProjectWithContent[];
	} catch (error) {
		console.error("Error loading generated projects:", error);
		return [];
	}
}

// 環境に応じたプロジェクト取得
export function getAllProjects(): ProjectWithContent[] {
	const mdxProjects = getAllProjectsFromMDX();
	if (mdxProjects.length > 0) {
		return mdxProjects;
	}
	return getAllProjectsFromGenerated();
}

// 特定プロジェクトの取得
export function getMDXContent(slug: string): ProjectWithContent {
	try {
		// 開発環境：MDXファイルから直接読み込み
		const filePath = path.join(projectsDirectory, `${slug}.mdx`);
		if (fs.existsSync(filePath)) {
			const fileContent = fs.readFileSync(filePath, "utf8");
			const { data, content } = matter(fileContent);
			return {
				metadata: data as ProjectMetadata,
				content,
				slug,
			};
		}

		// 本番環境：生成されたデータから検索
		const allProjects = getAllProjectsFromGenerated();
		const project = allProjects.find((p) => p.slug === slug);
		if (project) {
			return project;
		}

		// フォールバック
		return {
			metadata: {
				title: slug,
				description: "Content not found",
				tech: [],
				images: ["/placeholder.svg?height=400&width=800"],
				status: "不明",
				startDate: "2024-01-01",
				team: "不明",
			},
			content: `# ${slug}\n\nContent not found.`,
			slug,
		};
	} catch (error) {
		console.error(`Error reading content for ${slug}:`, error);
		return {
			metadata: {
				title: slug,
				description: "Content not found",
				tech: [],
				images: ["/placeholder.svg?height=400&width=800"],
				status: "不明",
				startDate: "2024-01-01",
				team: "不明",
			},
			content: `# ${slug}\n\nContent not found.`,
			slug,
		};
	}
}

// Featured プロジェクトを取得
export function getFeaturedProjects(): ProjectWithContent[] {
	const allProjects = getAllProjects();
	const featuredProjects = allProjects.filter(
		(project) => project.metadata.featured === true,
	);

	return featuredProjects.sort(
		(a, b) =>
			new Date(b.metadata.startDate).getTime() -
			new Date(a.metadata.startDate).getTime(),
	);
}
