import fs from "fs";
import matter from "gray-matter";
import path from "path";

const projectsDirectory = path.resolve(__dirname, "../projects");

export interface ProjectMetadata {
	title: string;
	description: string;
	tech: string[];
	images: string[];
	status: string;
	startDate: string;
	endDate?: string;
	team: string;
	featured?: boolean; // 新しく追加
	githubUrl?: string;
	liveUrl?: string;
}

export interface ProjectWithContent {
	metadata: ProjectMetadata;
	content: string;
	slug: string;
}

export async function getMDXContent(slug: string): Promise<ProjectWithContent> {
	try {
		const filePath = path.join(projectsDirectory, `${slug}.mdx`);
		const fileContent = fs.readFileSync(filePath, "utf8");
		const { data, content } = matter(fileContent);

		return {
			metadata: data as ProjectMetadata,
			content,
			slug,
		};
	} catch (error) {
		console.error(`Error reading MDX file for ${slug}:`, error);
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

export function getAllProjects(): ProjectWithContent[] {
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
		console.error("Error reading project directory:", error);
		return [];
	}
}

// Featured プロジェクトを取得する関数
export function getFeaturedProjects(): ProjectWithContent[] {
	const allProjects = getAllProjects();
	const featuredProjects = allProjects.filter(
		(project) => project.metadata.featured === true,
	);

	// featuredプロジェクトを開始日順でソート
	return featuredProjects.sort(
		(a, b) =>
			new Date(b.metadata.startDate).getTime() -
			new Date(a.metadata.startDate).getTime(),
	);
}
