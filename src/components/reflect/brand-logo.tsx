"use client";

import { AssetImg } from "./asset-media";

interface BrandLogoProps {
  size?: number;
  className?: string;
}

/**
 * Reflect app icon — rounded-square badge with the glowing network sphere.
 * The 22.5% radius clips the baked-in black corners so the icon floats
 * cleanly on any background.
 */
export function BrandLogo({ size = 30, className = "" }: BrandLogoProps) {
  return (
    <AssetImg
      src="/reflect/images/logo.png"
      alt=""
      width={size}
      height={size}
      className={`block shrink-0 rounded-[22.5%] shadow-[0_2px_12px_rgba(124,58,237,0.4)] ${className}`}
    />
  );
}
