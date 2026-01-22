import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Article, Post, PostFrontmatter } from "./entities/article";

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");

/**
 * 外部 RSS フィードの URL
 * 使用する場合はコメントアウトを解除してください
 */
const EXTERNAL_RSS_FEEDS: string[] = ["https://zenn.dev/suzuki3jp/feed"];

/**
 * すべてのブログ記事を取得（日付順）
 */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.(mdx|md)$/, "");
    const filePath = path.join(POSTS_DIR, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    const frontmatter = data as PostFrontmatter;

    return {
      slug,
      content,
      title: frontmatter.title || "Untitled",
      date: frontmatter.date || new Date().toISOString(),
      excerpt: frontmatter.excerpt || content.slice(0, 150) + "...",
      tags: frontmatter.tags || [],
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/**
 * スラッグからブログ記事を取得
 */
export function getPostBySlug(slug: string): Post | null {
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const mdPath = path.join(POSTS_DIR, `${slug}.md`);

  let filePath: string;
  if (fs.existsSync(mdxPath)) {
    filePath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    filePath = mdPath;
  } else {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const frontmatter = data as PostFrontmatter;

  return {
    slug,
    content,
    title: frontmatter.title || "Untitled",
    date: frontmatter.date || new Date().toISOString(),
    excerpt: frontmatter.excerpt || content.slice(0, 150) + "...",
    tags: frontmatter.tags || [],
  };
}

/**
 * すべてのブログ記事スラッグを取得
 */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.(mdx|md)$/, ""));
}

/**
 * ローカルの記事を Article 形式に変換
 */
function getLocalArticles(): Article[] {
  const posts = getAllPosts();
  return posts.slice(0, 5).map((post) => ({
    title: post.title,
    link: `/blogs/${post.slug}`,
    pubDate: post.date,
    contentSnippet: post.excerpt || "",
    source: "Blog",
  }));
}

/**
 * 外部 RSS フィードから記事を取得
 */
async function getExternalArticles(): Promise<Article[]> {
  if (EXTERNAL_RSS_FEEDS.length === 0) {
    return [];
  }

  const Parser = (await import("rss-parser")).default;
  const parser = new Parser();
  const articles: Article[] = [];

  for (const feedUrl of EXTERNAL_RSS_FEEDS) {
    try {
      const feed = await parser.parseURL(feedUrl);
      const feedArticles = feed.items.slice(0, 5).map((item) => ({
        title: item.title || "Untitled",
        link: item.link || "",
        pubDate: item.pubDate || item.isoDate || "",
        contentSnippet: item.contentSnippet || item.content || "",
        source: new URL(feedUrl).hostname.replace("www.", ""),
      }));
      articles.push(...feedArticles);
    } catch {
      // フィード取得に失敗した場合はスキップ
    }
  }

  return articles;
}

/**
 * すべての記事を取得（ローカル + 外部）
 */
export async function getAllArticles(): Promise<Article[]> {
  const [localArticles, externalArticles] = await Promise.all([
    Promise.resolve(getLocalArticles()),
    getExternalArticles(),
  ]);

  const allArticles = [...localArticles, ...externalArticles];

  // 日付順でソート（新しい順）
  allArticles.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
  );

  return allArticles.slice(0, 10);
}
