import type { PropsWithChildren } from "react";

export function CenteredLayout({
  children,
  className,
  parentClassName,
}: PropsWithChildren<{ className?: string; parentClassName?: string }>) {
  return (
    <div className={`flex w-full flex-col ${parentClassName ?? ""}`}>
      <div className={`mx-auto w-full max-w-[960px] px-6 ${className ?? ""}`}>
        {children}
      </div>
    </div>
  );
}
