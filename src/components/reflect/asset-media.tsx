"use client";

import * as React from "react";
import { useAssetGate } from "./asset-preloader";

/**
 * Drop-in <img>/<video> replacements that read from the AssetGate blob cache.
 * While a given asset has no blob URL yet (e.g. fetch failed and the gate
 * opened via failsafe), it falls back to streaming the original public URL.
 */

interface AssetImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export function AssetImg({ src, ...rest }: AssetImgProps) {
  const { getAssetUrl } = useAssetGate();
  const resolved = getAssetUrl(src);
  return <img {...rest} src={resolved ?? src} alt={rest.alt} />;
}

interface AssetVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

export function AssetVideo({ src, ...rest }: AssetVideoProps) {
  const { getAssetUrl } = useAssetGate();
  const resolved = getAssetUrl(src);
  return <video {...rest} src={resolved ?? src} preload="auto" />;
}
