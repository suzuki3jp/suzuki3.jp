import { Github, type LucideComponent, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AboutSection } from "@/features/about/components";
import { ExperienceSection } from "@/features/experience/components";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <header className="mb-16 space-y-6">
          <div className="flex items-center gap-6">
            <Image
              src="/light-icon.png"
              alt="suzuki3jp"
              width={96}
              height={96}
              className="rounded-full"
              priority
            />
            <div>
              <h1 className="font-medium text-4xl tracking-tight">suzuki3jp</h1>
              <p className="mt-2 text-muted-foreground">Frontend Engineer</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground text-sm">Find me on:</span>
            <SocialLink
              href="https://github.com/suzuki3jp"
              label="GitHub"
              Icon={Github}
            />
            <SocialLink
              href="https://twitter.com/_suzuki3jp"
              label="Twitter"
              Icon={Twitter}
            />
          </div>
        </header>
        <AboutSection />
        <ExperienceSection />
      </div>
    </main>
  );
}

function SocialLink({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: typeof LucideComponent;
}) {
  return (
    <Button variant="outline" size="icon" asChild>
      <Link href={href} target="_blank" rel="noopener noreferrer">
        <Icon className="size-4" />
        <span className="sr-only">{label}</span>
      </Link>
    </Button>
  );
}
