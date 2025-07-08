"use server";

import {
	getAllProjects,
	getFeaturedProjects,
	getMDXContent,
	type ProjectWithContent,
} from "./mdx";

export async function getProjectContent(
	slug: string,
): Promise<ProjectWithContent> {
	return await getMDXContent(slug);
}

export async function getAllProjectsAction(): Promise<ProjectWithContent[]> {
	return getAllProjects();
}

export async function getFeaturedProjectsAction(): Promise<
	ProjectWithContent[]
> {
	return getFeaturedProjects();
}
