"use server";
import RSSParser from "rss-parser";
import { ZENN_URL } from "@/constants";
import { type Article, ArticleProvider } from "./entities/article";

export async function getZennArticles(): Promise<Article[]> {
  const parser = new RSSParser();
  const feed = await parser.parseURL(`${ZENN_URL}/feed`);

  return feed.items.map((item) => ({
    provider: ArticleProvider.Zenn,
    title: item.title ?? "Untitled",
    url: item.link ?? "",
    publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
  }));
}
