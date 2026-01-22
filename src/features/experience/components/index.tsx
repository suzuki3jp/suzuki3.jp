import { ExternalLink } from "lucide-react";
import Link from "next/link";
import {
  calcDuration,
  formatDuration,
  formatPeriod,
} from "@/features/shared/date-utils";
import type { Experience } from "../entities/experience";

const EXPERIENCES: Experience[] = [
  {
    company: "ピクシブ株式会社",
    role: "アルバイト",
    start: "2026-01",
    description: "長期インターンに引き続き、pixiv.net の開発に参加。",
  },
  {
    company: "ピクシブ株式会社",
    role: "長期インターン（フロントエンドエンジニア）",
    start: "2025-10",
    end: "2025-10",
    description:
      "Next.js, TypeScript, Vue, php で構築された pixiv.net の開発に参加。新機能の開発やリファクタリングなどに取り組みました。",
    link: "https://zenn.dev/suzuki3jp/articles/2025-10-pixiv-internship",
  },
];

export function ExperienceSection() {
  return (
    <section className="mb-16">
      <h2 className="mb-6 font-medium text-muted-foreground text-sm uppercase tracking-wider">
        Experience
      </h2>
      <div className="space-y-8">
        {EXPERIENCES.map((exp) => {
          const duration = calcDuration(exp.start, exp.end);
          return (
            <div
              key={`${exp.company}-${exp.role}`}
              className="border-border border-l-2 pl-6"
            >
              <div className="mb-2 flex items-baseline justify-between">
                <h3 className="font-medium text-lg">{exp.company}</h3>
                <span className="flex items-center gap-2 text-muted-foreground text-sm">
                  {formatPeriod(exp.start, exp.end)}
                  {exp.link && (
                    <Link
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-foreground"
                    >
                      <ExternalLink className="size-3.5" />
                      <span className="sr-only">外部リンク</span>
                    </Link>
                  )}
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                {exp.role}・{formatDuration(duration)}
              </p>
              {exp.description && (
                <p className="mt-2 text-sm leading-relaxed">
                  {exp.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
