import fs from "fs";
import matter from "gray-matter";
import path from "path";

const contentDirectory = path.join(process.cwd(), "content");

export interface ProjectMetadata {
	title: string;
	description: string;
	tech: string[];
	image: string;
	status: string;
	year: string;
	duration: string;
	team: string;
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
		const filePath = path.join(contentDirectory, "projects", `${slug}.mdx`);
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
				image: "/placeholder.svg?height=400&width=800",
				status: "不明",
				year: "不明",
				duration: "不明",
				team: "不明",
			},
			content: `# ${slug}\n\nContent not found.`,
			slug,
		};
	}
}

export function getAllProjects(): ProjectWithContent[] {
	try {
		const projectsDirectory = path.join(contentDirectory, "projects");

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

		return projects.sort(
			(a, b) =>
				Number.parseInt(b.metadata.year) - Number.parseInt(a.metadata.year),
		);
	} catch (error) {
		console.error("Error reading project directory:", error);
		return [];
	}
}
