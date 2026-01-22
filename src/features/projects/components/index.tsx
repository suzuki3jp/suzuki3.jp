import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPeriod } from "@/features/shared/date-utils";
import { getProjects } from "../get-projects";
import { ImageSlideshow } from "./image-slideshow";

export function ProjectsSection() {
  const projects = getProjects();

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="mb-16">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="font-medium text-muted-foreground text-sm uppercase tracking-wider">
          Projects
        </h2>
        <Button variant="ghost" size="sm" asChild className="-mr-3">
          <Link
            href="https://github.com/suzuki3jp?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs"
          >
            View More
            <ExternalLink className="ml-1 size-3" />
          </Link>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="overflow-hidden rounded-lg border border-border"
          >
            <ImageSlideshow images={project.thumbnails} alt={project.title} />
            <Link href={`/projects/${project.slug}`} className="group">
              <div className="p-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-medium text-lg">{project.title}</h3>
                  <span className="text-muted-foreground text-sm">
                    {formatPeriod(project.start, project.end)}
                  </span>
                </div>
                <p className="mt-1 text-muted-foreground text-sm">
                  {project.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
