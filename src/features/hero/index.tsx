import Link from "next/link";
import { GITHUB_URL, X_URL, ZENN_URL } from "@/constants";
import { CenteredLayout } from "@/features/layout/components/centerd-layout";

export function Hero() {
  return (
    <CenteredLayout
      className="-translate-y-16 my-auto space-y-7"
      parentClassName="h-full"
    >
      <h1 className="font-bold text-[64px]">
        Hey there,
        <br />
        I'm suzuki3jp!
      </h1>
      <div className="space-y-14">
        <p className="text-[20px]">Developer, Otaku, Student, Video Editor</p>
        <div className="space-x-3 text-[20px] underline decoration-[0.025em] decoration-current underline-offset-[0.25em]">
          <SocialLink label="X" href={X_URL} />
          <SocialLink label="GitHub" href={GITHUB_URL} />
          <SocialLink label="Zenn" href={ZENN_URL} />
        </div>
      </div>
    </CenteredLayout>
  );
}

function SocialLink({ label, href }: { label: string; href: string }) {
  return (
    <Link href={href} target="_blank">
      {label}
    </Link>
  );
}
