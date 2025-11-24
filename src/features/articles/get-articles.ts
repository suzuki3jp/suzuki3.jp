"use server";

import type { Article } from "./entities/article";
import { getZennArticles } from "./get-zenn-articles";

export async function getArticles(): Promise<Article[]> {
  return getZennArticles();
}
