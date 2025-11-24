export type Article = {
  provider: ArticleProvider;
  title: string;
  url: string;
  publishedAt: Date;
};

export enum ArticleProvider {
  Zenn = "Zenn",
}

export const ArticleProviderDisplayName: Record<ArticleProvider, string> = {
  [ArticleProvider.Zenn]: "zenn.dev",
};
