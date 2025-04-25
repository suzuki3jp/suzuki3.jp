import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
    title: string;
    description: string;
    imageUrl?: string;
    githubUrl: string;
    demoUrl?: string;
}

export function ProjectCard({
    title,
    description,
    imageUrl,
    githubUrl,
    demoUrl,
}: ProjectCardProps) {
    return (
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={imageUrl || "/placeholder.svg?height=200&width=400"}
                    alt={title}
                    height={200}
                    width={400}
                    className="object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>

            <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm">{description}</p>
            </CardContent>

            <CardFooter className="flex justify-between p-6 pt-0">
                <Button variant="outline" size="sm" asChild>
                    <Link
                        href={githubUrl}
                        target="_blank"
                        className="flex items-center gap-1"
                    >
                        <Github className="h-4 w-4" />
                        <span>GitHub</span>
                    </Link>
                </Button>

                {demoUrl && (
                    <Button variant="outline" size="sm" asChild>
                        <Link
                            href={demoUrl}
                            target="_blank"
                            className="flex items-center gap-1"
                        >
                            <ExternalLink className="h-4 w-4" />
                        </Link>
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
