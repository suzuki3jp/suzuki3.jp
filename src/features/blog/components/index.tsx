import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/features/shared/date-utils";
import { getAllArticles } from "../get-articles";

export async function BlogSection() {
  const articles = await getAllArticles();

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="mb-16">
      <h2 className="mb-6 font-medium text-muted-foreground text-sm uppercase tracking-wider">
        Articles
      </h2>
      <div className="space-y-6">
        {articles.map((article, index) => {
          const isInternalPost = article.source === "Blog";

          return (
            <div
              key={`${article.link}-${index}`}
              className="border-border border-b pb-6 last:border-0"
            >
              {isInternalPost ? (
                <Link href={article.link} className="group block">
                  <ArticleContent article={article} />
                </Link>
              ) : (
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <ArticleContent article={article} />
                </a>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ArticleContent({
  article,
}: {
  article: {
    title: string;
    contentSnippet: string;
    source: string;
    pubDate: string;
  };
}) {
  return (
    <>
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="font-medium text-base leading-relaxed transition-colors group-hover:text-muted-foreground">
          {article.title}
        </h3>
        <ExternalLink className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
      </div>
      <p className="mb-2 line-clamp-2 text-muted-foreground text-sm leading-relaxed">
        {article.contentSnippet}
      </p>
      <div className="flex items-center gap-3 text-muted-foreground text-xs">
        <span>{article.source}</span>
        <span>•</span>
        <time>{formatDate(article.pubDate)}</time>
      </div>
    </>
  );
}
