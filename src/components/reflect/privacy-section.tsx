import { AssetVideo, AssetImg } from "./asset-media";

export function PrivacySection() {
  return (
    <section
      id="privacy"
      className="relative flex items-center justify-center overflow-hidden px-5 py-20 text-center sm:px-6 lg:py-[120px]"
      aria-labelledby="privacy-title"
    >
      {/* Encrypted cipher text cloud background video */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-full max-w-[1050px] -translate-x-1/2 -translate-y-1/2"
      >
        <AssetVideo
          className="block h-auto w-full brightness-110"
          autoPlay
          loop
          muted
          playsInline
          src="/reflect/videos/3rd-page-video.webm"
        />
      </div>

      <div className="rf-section-header">
        {/* Glowing padlock emblem */}
        <div className="mx-auto mb-6 h-[72px] w-[72px] sm:h-20 sm:w-20">
          <AssetImg
            src="/reflect/images/3rd-page-image.png"
            alt="Glowing privacy padlock"
            className="block h-full w-full mix-blend-screen drop-shadow-[0_0_24px_rgba(168,85,247,0.7)] brightness-125"
            width={72}
            height={72}
            style={{
              WebkitMaskImage:
                "radial-gradient(circle at 50% 50%, black 32%, transparent 66%)",
              maskImage:
                "radial-gradient(circle at 50% 50%, black 32%, transparent 66%)",
            }}
          />
        </div>

        <div className="rf-badge mb-6">
          <span>Privacy</span>
        </div>

        <h2
          id="privacy-title"
          className="rf-title mb-5 text-4xl sm:text-5xl lg:text-[4.25rem]"
        >
          Local files
        </h2>

        <p className="rf-subtitle mx-auto mb-8 max-w-[620px]">
          Your notes live in a folder you choose. Notes marked private
          <br className="hidden sm:block" />
          are excluded from AI note access.
        </p>

        <div className="mt-2.5">
          <a href="#how-privacy-works" className="rf-btn rf-btn-secondary">
            How privacy works
          </a>
        </div>
      </div>
    </section>
  );
}
