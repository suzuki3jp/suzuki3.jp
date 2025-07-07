"use server";

import { getAllProjects, getMDXContent, type ProjectWithContent } from "./mdx";

export async function getProjectContent(
	slug: string,
): Promise<ProjectWithContent> {
	return await getMDXContent(slug);
}

export async function getAllProjectsAction(): Promise<ProjectWithContent[]> {
	return getAllProjects();
}
