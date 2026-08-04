"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

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
  const imgRef = useRef<HTMLImageElement>(null);

  const markLoaded = useCallback(() => {
    setLoaded(true);
  }, []);

  // Images en cache : onLoad peut partir avant l’hydratation → opacity bloquée à 0.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      markLoaded();
    }
  }, [src, markLoaded]);

  // `relative` par défaut seulement : si le wrapper reçoit `absolute`/`fixed`,
  // les deux classes de position coexistent et `relative` (plus tard dans la
  // CSS générée) gagne — le conteneur s'effondre à hauteur 0 et l'image
  // devient invisible. On n'ajoute donc `relative` qu'en l'absence d'une
  // autre classe de position.
  const hasPosition = /(?:^|\s)(absolute|fixed|sticky|static)(?:\s|$)/.test(
    wrapperClassName,
  );

  return (
    <div
      className={`${hasPosition ? "" : "relative"} overflow-hidden bg-ciel/30 ${wrapperClassName}`}
    >
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        priority={priority}
        quality={quality}
        onLoad={markLoaded}
        onLoadingComplete={markLoaded}
        className={`object-cover transition-opacity duration-500 ease-out motion-reduce:transition-none ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        style={objectPosition ? { objectPosition } : undefined}
      />
    </div>
  );
}
