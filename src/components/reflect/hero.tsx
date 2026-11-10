"use client";

import * as React from "react";
import { AssetVideo, AssetImg } from "./asset-media";
import { VideoModal } from "./video-modal";

export function Hero() {
  const [demoOpen, setDemoOpen] = React.useState(false);

  return (
    <section
      id="product"
      className="relative overflow-hidden px-5 pb-10 pt-14 text-center sm:px-6 lg:pt-[72px]"
      aria-labelledby="hero-title"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 z-0 h-[500px] w-[900px] max-w-full -translate-x-1/2"
        style={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(147,51,234,0.16) 0%, rgba(8,6,18,0) 70%)",
        }}
      />

      <div className="rf-section-header">
        <a href="#open" className="rf-badge mb-6 inline-flex">
          <span className="rf-sparkle" aria-hidden="true">
            ✦
          </span>
          <span>Meet Reflect Open</span>
        </a>

        <h1
          id="hero-title"
          className="rf-title mb-5 text-5xl sm:text-6xl lg:text-[4.25rem]"
        >
          Think better with Reflect
        </h1>

        <p className="rf-subtitle mx-auto mb-8 max-w-[620px]">
          An open-source note-taking app with daily notes, backlinks, and
          local Markdown files.
        </p>

        <div className="flex flex-col items-center justify-center gap-3.5 sm:flex-row">
          <a href="#download" className="rf-btn rf-btn-primary w-full sm:w-auto">
            Download for Mac
          </a>
          <a
            href="#ios"
            className="rf-btn rf-btn-secondary w-full sm:w-auto"
          >
            Get the iPhone &amp; iPad app
          </a>
        </div>

        <p className="mb-6 mt-3.5 text-[0.813rem] text-[#6e6d82]">
          Free on Mac. Paid subscription on iPhone and iPad.
        </p>
      </div>

      {/* Hero visual showcase: black hole video behind the app card */}
      <div className="relative mx-auto max-w-[1140px] pt-24 sm:pt-32 lg:pt-[100px]">
        {/* Celestial radar background arcs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-24 z-[1] w-[140%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-40 mix-blend-screen sm:top-32 sm:w-full lg:top-[100px] lg:max-w-[1150px]"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 55% at 50% 50%, black 40%, transparent 75%)",
            maskImage:
              "radial-gradient(ellipse 60% 55% at 50% 50%, black 40%, transparent 75%)",
          }}
        >
          <AssetImg
            src="/reflect/images/Backgorund.webp"
            alt=""
            className="block h-auto w-full"
            width={1536}
            height={1536}
          />
        </div>

        {/* Black hole portal video — centered on the app card */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-24 z-[2] w-[130%] max-w-none -translate-x-1/2 -translate-y-1/2 sm:top-32 lg:top-[100px] lg:w-full lg:max-w-[1050px]"
        >
          <AssetVideo
            className="block h-auto w-full"
            autoPlay
            loop
            muted
            playsInline
            src="/reflect/videos/1st-page-video.webm"
          />
        </div>

        {/* App window card */}
        <div
          className="relative z-[3] overflow-hidden rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_50px_-10px_rgba(147,51,234,0.2)]"
          style={{
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          {/* Glow line */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 z-[5] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(192,132,252,0.85) 50%, transparent 100%)",
            }}
          />
          <div className="relative w-full leading-[0]">
            <AssetImg
              src="/reflect/images/Ist-page-image.png"
              alt="Reflect app note-taking interface showing daily notes, backlinks, and a calendar"
              className="block h-auto w-full opacity-95"
              width={1536}
              height={984}
            />
            <button
              type="button"
              onClick={() => setDemoOpen(true)}
              aria-label="Play product demo"
              className="absolute left-1/2 top-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.22] bg-[rgba(22,18,38,0.75)] text-white shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_25px_rgba(168,85,247,0.4)] transition-all duration-200 hover:scale-110 hover:border-[rgba(192,132,252,0.7)] hover:bg-[rgba(35,26,64,0.88)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.7),0_0_35px_rgba(168,85,247,0.65)] sm:h-16 sm:w-16"
              style={{
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="currentColor"
                aria-hidden="true"
                style={{ marginLeft: 3 }}
              >
                <polygon points="6 4 20 12 6 20" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <VideoModal
        open={demoOpen}
        onClose={() => setDemoOpen(false)}
        videoSrc="/reflect/videos/click-video.webm"
      />
    </section>
  );
}
