import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Github, Globe, Mail, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ILink {
    component: React.ReactNode;
    href: string;
}

const links: ILink[] = [
    {
        component: <Github className="w-5 h-5" />,
        href: "https://github.com/suzuki3jp",
    },
    {
        component: <Twitter className="w-5 h-5" />,
        href: "https://twitter.com/suzuki3_jp",
    },
    {
        component: <Globe className="w-5 h-5" />,
        href: "https://suzuki3.jp",
    },
];

interface IPorject {
    title: string;
    description: string;
    github: string;
    imageUrl?: string;
    demo?: string;
}

const projects: IPorject[] = [
    {
        title: "PlaylistWizard",
        description:
            "YouTube, Spotify のプレイリストを管理、整理するためのウェブアプリケーション。",
        github: "https://github.com/suzuki3jp/playlistwizard",
        demo: "https://playlistwizard.suzuki3.jp",
    },
    {
        title: "MySteam",
        description:
            "Steam の最近プレイしたゲームや所有しているゲームを一枚の画像に出力するウェブアプリケーション。動的なsvgを返却するエンドポイントも提供。",
        github: "https://github.com/suzuki3jp/my-steam",
        demo: "https://my-steam.suzuki3.jp",
    },
    {
        title: "ArikenCompany",
        description: "Twitch Chat Bot 兼切り抜き業務効率化アプリケーション。",
        github: "https://github.com/suzuki3jp/arikencompany",
        demo: "https://arikencompany.suzuki3.jp",
    },
    {
        title: "suzuki3.jp",
        description: "このサイト。",
        github: "https://github.com/suzuki3jp/suzuki3.jp",
        demo: "https://suzuki3.jp",
    },
];

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            {/* ヘッダーセクション - 画面いっぱいに表示 */}
            <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center">
                <div className="flex flex-col items-center space-y-6 max-w-3xl">
                    {/* アイコン */}
                    <div className="relative w-32 h-32 overflow-hidden rounded-full border-4 border-primary/20">
                        <Image
                            src="/suzuki3jp-icon.png"
                            alt="プロフィール画像"
                            width={128}
                            height={128}
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* 名前 */}
                    <h1 className="text-4xl font-bold tracking-tight">
                        鈴木（suzuki3jp）
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        オタクしたり切り抜きしたりゲームしたりプログラム書いたり
                    </p>

                    {/* ソーシャルリンク */}
                    <div className="flex items-center justify-center gap-4 mt-6">
                        {links.map((link, index) => (
                            <Button
                                key={link.href}
                                variant="ghost"
                                size="icon"
                                asChild
                            >
                                <Link
                                    href={link.href}
                                    target="_blank"
                                    aria-label="ソーシャルリンク"
                                >
                                    {link.component}
                                </Link>
                            </Button>
                        ))}
                    </div>

                    {/* スクロールダウン指示 */}
                    <div className="absolute bottom-8 animate-bounce">
                        <p className="text-sm text-muted-foreground">
                            スクロールしてプロジェクトを見る
                        </p>
                        <div className="flex justify-center mt-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-muted-foreground"
                            >
                                <title>hoge</title>
                                <path d="M12 5v14M5 12l7 7 7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            {/* プロジェクトセクション */}
            <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/50">
                <div className="container mx-auto max-w-5xl">
                    <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">
                        プロジェクト
                    </h2>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.title}
                                title={project.title}
                                description={project.description}
                                imageUrl={project.imageUrl}
                                githubUrl={project.github}
                                demoUrl={project.demo}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* フッター */}
            <footer className="py-6 px-4 border-t">
                <div className="container mx-auto max-w-5xl flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} suzuki3jp. All rights
                        reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
