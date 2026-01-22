/**
 * 記事のソース（内部ブログまたは外部サービス）
 */
export type ArticleSource = "Blog" | "Zenn" | "Qiita" | string;

/**
 * 記事
 */
export interface Article {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  source: ArticleSource;
}

/**
 * ブログ記事の frontmatter
 */
export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
}

/**
 * ブログ記事（frontmatter + メタデータ）
 */
export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
}
