import type { PropsWithChildren } from "react";

export function CenteredLayout({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className="flex h-full w-full flex-col">
      <div className={`mx-auto w-full max-w-[960px] px-6 ${className ?? ""}`}>
        {children}
      </div>
    </div>
  );
}
