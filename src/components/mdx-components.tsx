import type { ComponentProps } from "react";

function isVideoSource(src: unknown): src is string {
  return typeof src === "string" && /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(src);
}

function MdxImage(props: ComponentProps<"img">) {
  const { src, alt, ...rest } = props;

  if (isVideoSource(src)) {
    return (
      <video
        className="my-6 aspect-video w-full rounded-lg border border-border bg-muted"
        autoPlay
        muted
        playsInline
        preload="metadata"
        src={src}
      >
        {alt}
      </video>
    );
  }

  return <img alt={alt ?? ""} src={src} {...rest} />;
}

export const mdxComponents = {
  img: MdxImage,
};
