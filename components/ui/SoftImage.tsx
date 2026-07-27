"use client";

import Image from "next/image";
import { useState } from "react";

type SoftImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  className?: string;
  wrapperClassName?: string;
  objectPosition?: string;
};

/**
 * Image légère — fade opacity uniquement (pas de blur/scale au load = plus fluide).
 */
export function SoftImage({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  priority = false,
  quality = 72,
  className = "",
  wrapperClassName = "",
  objectPosition,
}: SoftImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-ciel/30 ${wrapperClassName}`}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        priority={priority}
        quality={quality}
        onLoad={() => setLoaded(true)}
        className={`object-cover transition-opacity duration-500 ease-out motion-reduce:transition-none ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        style={objectPosition ? { objectPosition } : undefined}
      />
    </div>
  );
}
