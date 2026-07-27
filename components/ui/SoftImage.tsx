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
  className?: string;
  wrapperClassName?: string;
  objectPosition?: string;
};

/**
 * Image avec blur-up à l'apparition — rendu premium type Herna.
 */
export function SoftImage({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  priority = false,
  className = "",
  wrapperClassName = "",
  objectPosition,
}: SoftImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-ciel/40 ${wrapperClassName}`}
      style={objectPosition ? { ["--img-pos" as string]: objectPosition } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        priority={priority}
        onLoad={() => setLoaded(true)}
        className={`object-cover transition-[opacity,filter,transform] duration-700 ease-out motion-reduce:transition-none ${
          loaded ? "scale-100 opacity-100 blur-0" : "scale-[1.03] opacity-0 blur-md"
        } ${className}`}
        style={objectPosition ? { objectPosition } : undefined}
      />
    </div>
  );
}
