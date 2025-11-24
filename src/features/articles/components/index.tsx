import Link from "next/link";
import { CenteredLayout } from "@/features/layout/components/centerd-layout";
import { ArticleProviderDisplayName } from "../entities/article";
import { getArticles } from "../get-articles";

export async function ArticlesSection() {
  const articles = await getArticles();

  return (
    <CenteredLayout className="space-y-8 py-3" parentClassName="mb-64">
      <h1 className="font-bold text-3xl">Articles</h1>
      <div className="subtle-scrollbar max-h-140 space-y-6 overflow-y-auto">
        {articles.map((article) => (
          <div key={article.url} className="space-y-3">
            <p>
              {toArticleDate(article.publishedAt)}{" "}
              {ArticleProviderDisplayName[article.provider]}
            </p>
            <h2 className="font-bold text-[20px]">
              <Link href={article.url} target="_blank">
                {article.title}
              </Link>
            </h2>
          </div>
        ))}
      </div>
    </CenteredLayout>
  );
}

function toArticleDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1)}-${String(date.getDate())}`;
}
