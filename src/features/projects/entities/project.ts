/**
 * プロジェクトの frontmatter
 */
export interface ProjectFrontmatter {
  title: string;
  description: string;
  thumbnails: string[];
  tags: string[];
  link?: string;
  start: string;
  end?: string;
}

/**
 * プロジェクト（frontmatter + メタデータ）
 */
export interface Project extends ProjectFrontmatter {
  slug: string;
  content: string;
}
