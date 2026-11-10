import { AssetVideo } from "./asset-media";

export function AboutSection() {
  return (
    <section
      id="company"
      className="relative overflow-hidden px-5 pb-0 pt-20 text-center sm:px-6 lg:pt-[120px]"
      aria-labelledby="about-title"
    >
      <div className="rf-section-header">
        <div className="rf-badge mb-6">
          <span>About</span>
        </div>

        <h2
          id="about-title"
          className="rf-title mb-5 text-4xl sm:text-5xl lg:text-[4.25rem]"
        >
          We&apos;re an indie team
          <br />
          dotted across the globe
        </h2>

        <p className="rf-subtitle mx-auto mb-9 max-w-[620px]">
          Our mission is to improve the way people think by making a
          <br className="hidden sm:block" />
          jolly good note-taking app.
        </p>

        <div className="mb-10 mt-2.5">
          <a href="#values" className="rf-btn rf-btn-secondary">
            See our values
          </a>
        </div>
      </div>

      {/* 3D rotating dotted globe */}
      <div className="relative mx-auto max-w-[1100px] leading-[0]">
        <AssetVideo
          className="block h-auto w-full brightness-[1.08] contrast-[1.05]"
          autoPlay
          loop
          muted
          playsInline
          aria-label="Rotating dotted globe showing team members across the world"
          src="/reflect/videos/4rd-page-video.webm"
        />
      </div>
    </section>
  );
}
