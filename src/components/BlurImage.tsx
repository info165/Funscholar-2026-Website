"use client";

import { useEffect, useRef, useState } from "react";
import { LQIP } from "@/lib/lqip";

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** Sizing / rounding for the wrapper box. */
  className?: string;
  /** object-fit and any transforms for the image itself. */
  imgClassName?: string;
  imgStyle?: React.CSSProperties;
  /** Decorative images that already have an adjacent label. */
  decorative?: boolean;
};

/**
 * Fades a photo in over a blurred 20px preview, so the frame is never empty
 * and the image resolves instead of popping in.
 *
 * The preview is inlined base64 (src/lib/lqip.ts), so it paints on first render
 * with no extra network request.
 */
export default function BlurImage({
  src,
  alt,
  width,
  height,
  className = "",
  imgClassName = "w-full h-full object-cover",
  imgStyle,
  decorative,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const placeholder = LQIP[src];

  // A cached image can finish decoding before React attaches onLoad, which
  // would strand it at opacity 0 — so check the complete flag on mount too.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <span className={`relative block overflow-hidden ${className}`}>
      {placeholder && !loaded && (
        <span
          aria-hidden
          className="absolute inset-0 scale-110 bg-cover bg-center blur-xl"
          style={{ backgroundImage: `url("${placeholder}")` }}
        />
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={decorative ? "" : alt}
        width={width}
        height={height}
        aria-hidden={decorative || undefined}
        onLoad={() => setLoaded(true)}
        className={`relative transition-opacity duration-700 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        } ${imgClassName}`}
        style={imgStyle}
      />
    </span>
  );
}
