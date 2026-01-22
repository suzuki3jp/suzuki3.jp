import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageSlideshow } from "@/features/projects/components/image-slideshow";
import {
  getProjectBySlug,
  getProjectSlugs,
} from "@/features/projects/get-projects";
import {
  calcDuration,
  formatDuration,
  formatPeriod,
} from "@/features/shared/date-utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>

        <article>
          <div className="mb-8 overflow-hidden rounded-lg">
            <ImageSlideshow images={project.thumbnails} alt={project.title} />
          </div>

          <header className="mb-8">
            <div className="mb-4 flex items-start justify-between">
              <h1 className="font-medium text-3xl tracking-tight">
                {project.title}
              </h1>
              <div className="flex space-x-4">
                <span className="my-auto text-muted-foreground text-sm">
                  {formatPeriod(project.start, project.end)}・
                  {formatDuration(calcDuration(project.start, project.end))}
                </span>

                {project.link && (
                  <Button variant="outline" size="icon" asChild>
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="size-4" />
                      <span className="sr-only">外部リンク</span>
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            <p className="mb-4 text-muted-foreground">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <MDXRemote source={project.content} />
          </div>
        </article>
      </div>
    </main>
  );
}
