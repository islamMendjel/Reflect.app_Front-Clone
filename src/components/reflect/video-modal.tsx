"use client";

import * as React from "react";
import { useAssetGate } from "./asset-preloader";

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  videoSrc: string;
}

export function VideoModal({ open, onClose, videoSrc }: VideoModalProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const { getAssetUrl } = useAssetGate();
  // Blob-cached version (preloaded by AssetGate) or stream fallback.
  const resolvedSrc = getAssetUrl(videoSrc) ?? videoSrc;

  // Close on Escape + lock body scroll while open
  React.useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  // Pause/reset video when closing
  React.useEffect(() => {
    if (!open && videoRef.current) {
      videoRef.current.pause();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Product demo video"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/85"
        style={{
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[960px] overflow-hidden rounded-2xl border border-[rgba(168,85,247,0.32)] bg-[#0d0a1a] shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(147,51,234,0.3)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-3 top-2 z-20 text-3xl leading-none text-[#c4c3d4] transition-colors hover:text-white"
        >
          &times;
        </button>
        <div className="relative w-full pt-[56.25%]">
          <video
            ref={videoRef}
            controls
            autoPlay
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={resolvedSrc} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}
