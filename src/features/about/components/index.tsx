import { Badge } from "@/components/ui/badge";

const SKILLS = ["TypeScript", "React", "Next.js", "Go", "Python"] as const;

export function AboutSection() {
  return (
    <section className="mb-16">
      <h2 className="mb-4 font-medium text-muted-foreground text-sm uppercase tracking-wider">
        About
      </h2>
      <p className="text-foreground leading-relaxed">
        29卒の学生です。現在は特にフロントエンドに興味があり、React / Next.js
        を中心に、個人やチームでWeb開発に取り組んでいます。
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {SKILLS.map((skill) => (
          <Badge key={skill} variant="secondary">
            {skill}
          </Badge>
        ))}
      </div>
    </section>
  );
}
