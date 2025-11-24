import Link from "next/link";
import { CenteredLayout } from "../layout/components/centerd-layout";
import { AuthorIcon } from "./components/author-icon";

export function Header() {
  return (
    <header className="py-3">
      <CenteredLayout className="flex items-center justify-between">
        <AuthorIcon size={60} />

        <div className="space-x-7">
          <HeaderLink label="Articles" href="/" />
          <HeaderLink label="Experience" href="/" />
          <HeaderLink label="Projects" href="/" />
        </div>
      </CenteredLayout>
    </header>
  );
}

function HeaderLink({ label, href }: { label: string; href: string }) {
  return (
    <Link href={href} className="font-bold text-2xl hover:underline">
      {label}
    </Link>
  );
}
