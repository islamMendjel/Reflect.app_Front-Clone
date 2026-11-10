import * as React from "react";
import { AssetVideo, AssetImg } from "./asset-media";

function DevicesIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="3" width="14" height="10" rx="1.5" />
      <line x1="5" y1="17" x2="13" y2="17" />
      <line x1="9" y1="13" x2="9" y2="17" />
      <rect x="15" y="7" width="7" height="14" rx="1.5" />
      <line x1="18.5" y1="18" x2="18.5" y2="18.01" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <rect x="9.5" y="11" width="5" height="4" rx="1" />
      <path d="M10.5 11V9.5a1.5 1.5 0 0 1 3 0V11" />
    </svg>
  );
}

export function RadarSection() {
  return (
    <section
      id="research"
      className="relative overflow-hidden px-5 pb-20 pt-16 text-center sm:px-6 lg:pb-[100px] lg:pt-[80px]"
      aria-labelledby="radar-title"
    >
      {/* Radar visual: semicircle dome + center badge */}
      <div className="relative mx-auto flex flex-col items-center justify-center">
        {/* Horizontal baseline extending to the edges */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-full h-px w-screen -translate-x-1/2 bg-white/[0.05]"
        />
        {/* Decorative vertical side lines */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[55%] hidden h-[220px] w-px bg-white/[0.05] lg:block"
          style={{ left: "max(16px, calc((100vw - 1200px) / 2))" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[55%] hidden h-[220px] w-px bg-white/[0.05] lg:block"
          style={{ right: "max(16px, calc((100vw - 1200px) / 2))" }}
        />

        <div className="rf-radar-clip">
          <AssetVideo
            className="rf-radar-video"
            autoPlay
            loop
            muted
            playsInline
            src="/reflect/videos/2nd-page-video.webm"
          />
        </div>

        {/* Central glowing hub badge */}
        <div className="relative z-10 -mt-8 flex h-16 w-16 items-center justify-center rounded-full shadow-[0_0_25px_rgba(168,85,247,0.7)]">
          <AssetImg
            src="/reflect/images/2nd-page-image.png"
            alt="Reflect central hub icon"
            className="block h-full w-full rounded-full"
            width={64}
            height={64}
          />
        </div>
      </div>

      <div className="rf-section-header mt-12">
        <div className="rf-badge mb-6">
          <span>Research and reading</span>
        </div>

        <h2
          id="radar-title"
          className="rf-title mb-5 text-4xl sm:text-5xl lg:text-[4.25rem]"
        >
          Never lose information
        </h2>

        <p className="rf-subtitle mx-auto mb-9 max-w-[620px]">
          Capture links, text, and screenshots with the Chrome extension on
          Mac.
        </p>
      </div>

      {/* Dual features row */}
      <div className="mx-auto mt-12 flex max-w-[960px] flex-col items-stretch justify-center md:flex-row">
        {/* Feature 1 */}
        <div className="flex flex-1 flex-col items-center px-6 py-6 text-center md:px-11">
          <div className="mb-4 flex h-11 w-11 items-center justify-center text-[#ede9fe]">
            <DevicesIcon />
          </div>
          <h3 className="mb-2.5 text-[1.15rem] font-semibold tracking-[-0.01em] text-white">
            Integrated with your devices
          </h3>
          <p className="text-[0.95rem] leading-[1.6] text-[#9d9cb2]">
            Read and write on Mac, iPhone, and iPad.
            <br />
            Set up iCloud Drive or Git to sync your notes.
          </p>
        </div>

        {/* Divider */}
        <div className="mx-auto h-px w-24 bg-white/[0.08] md:mx-0 md:h-auto md:w-px md:self-stretch" />

        {/* Feature 2 */}
        <div className="flex flex-1 flex-col items-center px-6 py-6 text-center md:px-11">
          <div className="mb-4 flex h-11 w-11 items-center justify-center text-[#ede9fe]">
            <ShieldIcon />
          </div>
          <h3 className="mb-2.5 text-[1.15rem] font-semibold tracking-[-0.01em] text-white">
            Keep useful context
          </h3>
          <p className="text-[0.95rem] leading-[1.6] text-[#9d9cb2]">
            Save the source link alongside your clips.
          </p>
        </div>
      </div>
    </section>
  );
}
