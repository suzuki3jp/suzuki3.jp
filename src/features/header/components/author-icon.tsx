import Image from "next/image";

import AuthorIconPath from "@/features/header/images/icon.png";

interface AuthorIconProps {
  size: number;
  className?: string;
}

export function AuthorIcon({ size, className }: AuthorIconProps) {
  return (
    <Image
      src={AuthorIconPath}
      alt="suzuki3jp's icon"
      width={size}
      height={size}
      className={`rounded-full ${className ?? ""}`}
    />
  );
}
