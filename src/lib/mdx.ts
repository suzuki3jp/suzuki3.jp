import fs from "fs";
import matter from "gray-matter";
import path from "path";

const projectsDirectory = path.join(process.cwd(), "src", "projects");

// デバッグ用ログ
console.log("Current working directory:", process.cwd());
console.log("Projects directory:", projectsDirectory);
console.log("Projects directory exists:", fs.existsSync(projectsDirectory));

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
		// デバッグ情報
		console.log("Checking projects directory:", projectsDirectory);

		if (!fs.existsSync(projectsDirectory)) {
			console.log("Projects directory does not exist");
			// Vercel環境での代替パスを試す
			const alternativePath = path.join(process.cwd(), "projects");
			console.log("Trying alternative path:", alternativePath);

			if (fs.existsSync(alternativePath)) {
				console.log("Alternative path exists, using it");
				return getProjectsFromDirectory(alternativePath);
			}

			console.log("No projects directory found");
			return [];
		}

		return getProjectsFromDirectory(projectsDirectory);
	} catch (error) {
		console.error("Error reading project directory:", error);
		return [];
	}
}

// ヘルパー関数：指定されたディレクトリからプロジェクトを取得
function getProjectsFromDirectory(directory: string): ProjectWithContent[] {
	const filenames = fs.readdirSync(directory);
	const projects = filenames
		.filter((name) => name.endsWith(".mdx"))
		.map((filename) => {
			const slug = filename.replace(/\.mdx$/, "");
			const filePath = path.join(directory, filename);
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

// 静的に生成されたJSONファイルからプロジェクトを取得（フォールバック）
async function getProjectsFromJson(): Promise<ProjectWithContent[]> {
	try {
		const response = await fetch("/projects.json");
		if (!response.ok) {
			throw new Error("Failed to fetch projects.json");
		}
		const projects = await response.json();
		return projects;
	} catch (error) {
		console.error("Error loading projects from JSON:", error);
		return [];
	}
}

// Vercel対応：まずファイルシステムを試し、失敗したらJSONファイルから取得
export async function getAllProjectsVercel(): Promise<ProjectWithContent[]> {
	try {
		// まず通常の方法を試す
		const fsProjects = getAllProjects();
		if (fsProjects.length > 0) {
			return fsProjects;
		}

		// ファイルシステムからの取得に失敗した場合、JSONファイルから取得
		console.log("Falling back to projects.json");
		return await getProjectsFromJson();
	} catch (error) {
		console.error("Error in getAllProjectsVercel:", error);
		return [];
	}
}
