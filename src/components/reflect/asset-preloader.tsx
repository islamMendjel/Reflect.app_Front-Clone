"use client";

import * as React from "react";

/**
 * AssetGate
 * --------
 * The whole website only appears once every critical image/video has been
 * fully downloaded (as in-memory blobs), so nothing ever "pops in" late.
 *
 * 1. Shows a branded splash screen with live byte-accurate progress.
 * 2. Fetches all critical assets via XHR (progress events) -> object URLs.
 * 3. Hands blob URLs to the page through context (`useAssetGate`), so
 *    <video>/<img> render instantly from memory — zero network wait.
 * 4. After the gate opens, the heavy demo video (modal) is prefetched
 *    in the background for instant playback when the user clicks play.
 */

/** Assets required before the website is revealed (~2MB total). */
const CRITICAL_ASSETS: readonly string[] = [
  "/reflect/videos/1st-page-video.webm",
  "/reflect/videos/2nd-page-video.webm",
  "/reflect/videos/3rd-page-video.webm",
  "/reflect/videos/4rd-page-video.webm",
  "/reflect/images/Backgorund.webp",
  "/reflect/images/Ist-page-image.png",
  "/reflect/images/2nd-page-image.png",
  "/reflect/images/3rd-page-image.png",
  "/reflect/images/logo.png",
];

/** Heavy assets fetched after the site is visible. */
const DEFERRED_ASSETS: readonly string[] = ["/reflect/videos/click-video.webm"];

/** Minimum time the splash stays visible (feels intentional, avoids flicker). */
const MIN_SPLASH_MS = 500;
/** Hard cap — never trap the user behind the splash for more than this. */
const MAX_WAIT_MS = 12_000;

interface AssetGateState {
  /** Blob URL for a given public path, or undefined / original path fallback. */
  getAssetUrl: (path: string) => string | undefined;
}

const AssetGateContext = React.createContext<AssetGateState>({
  getAssetUrl: () => undefined,
});

export function useAssetGate(): AssetGateState {
  return React.useContext(AssetGateContext);
}

/** XHR fetch with byte-accurate progress (fetch() streams lack reliable totals in all targets). */
function fetchBlobWithProgress(
  url: string,
  onProgress: (loaded: number, total: number) => void
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onprogress = (e) => {
      if (e.lengthComputable) onProgress(e.loaded, e.total);
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response as Blob);
      } else {
        reject(new Error(`HTTP ${xhr.status} for ${url}`));
      }
    };
    xhr.onerror = () => reject(new Error(`Network error for ${url}`));
    xhr.onabort = () => reject(new Error(`Aborted ${url}`));
    xhr.send();
  });
}

export function AssetGate({ children }: { children: React.ReactNode }) {
  const [urls, setUrls] = React.useState<Record<string, string>>({});
  const [ready, setReady] = React.useState(false);
  const [gone, setGone] = React.useState(false);
  const [displayProgress, setDisplayProgress] = React.useState(0);

  const urlsRef = React.useRef<Record<string, string>>({});
  const targetRef = React.useRef(0);
  const fractionsRef = React.useRef<Map<string, number>>(
    new Map(CRITICAL_ASSETS.map((p) => [p, 0]))
  );
  const openedRef = React.useRef(false);

  const storeBlob = React.useCallback((path: string, blob: Blob) => {
    const objectUrl = URL.createObjectURL(blob);
    urlsRef.current[path] = objectUrl;
    setUrls({ ...urlsRef.current });
  }, []);

  const updateFraction = React.useCallback((path: string, fraction: number) => {
    fractionsRef.current.set(path, Math.min(1, Math.max(0, fraction)));
    let sum = 0;
    for (const f of fractionsRef.current.values()) sum += f;
    targetRef.current = sum / CRITICAL_ASSETS.length;
  }, []);

  const openGate = React.useCallback(
    (startedAt: number) => {
      if (openedRef.current) return;
      openedRef.current = true;
      targetRef.current = 1;

      const wait = Math.max(0, MIN_SPLASH_MS - (performance.now() - startedAt));
      window.setTimeout(() => {
        setReady(true);
        // Warm up the heavy demo video while the user reads the hero.
        DEFERRED_ASSETS.forEach((path) => {
          if (urlsRef.current[path]) return;
          fetchBlobWithProgress(path, (loaded, total) =>
            updateFraction(path, (loaded / total) * CRITICAL_ASSETS.length)
          )
            .then((blob) => storeBlob(path, blob))
            .catch(() => {
              /* modal falls back to streaming directly from the network */
            });
        });
      }, wait);
    },
    [storeBlob, updateFraction]
  );

  React.useEffect(() => {
    const startedAt = performance.now();

    // Safety valve: whatever happens, the site must appear.
    const failsafe = window.setTimeout(() => openGate(startedAt), MAX_WAIT_MS);

    const jobs = CRITICAL_ASSETS.map((path) =>
      fetchBlobWithProgress(path, (loaded, total) =>
        updateFraction(path, loaded / total)
      )
        .then((blob) => {
          storeBlob(path, blob);
          updateFraction(path, 1);
        })
        .catch(() => {
          // Asset unavailable as blob — reveal anyway; consumers fall back
          // to streaming the original URL over the network.
          updateFraction(path, 1);
        })
    );

    Promise.all(jobs).then(() => {
      window.clearTimeout(failsafe);
      openGate(startedAt);
    });

    return () => {
      window.clearTimeout(failsafe);
      Object.values(urlsRef.current).forEach((u) => URL.revokeObjectURL(u));
      urlsRef.current = {};
    };
  }, [openGate, storeBlob, updateFraction]);

  // Smooth the progress bar toward the real target (rAF easing).
  React.useEffect(() => {
    if (ready) {
      setDisplayProgress(1);
      return;
    }
    let raf = 0;
    let current = 0;
    const tick = () => {
      const target = targetRef.current;
      current += (target - current) * 0.14;
      if (target - current < 0.004) current = target;
      setDisplayProgress(current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready]);

  // Lock scroll while the splash is up.
  React.useEffect(() => {
    if (ready) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ready]);

  // Unmount the splash from the DOM once its fade-out finished.
  React.useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(() => setGone(true), 800);
    return () => window.clearTimeout(t);
  }, [ready]);

  const getAssetUrl = React.useCallback(
    (path: string) => urls[path],
    [urls]
  );

  const contextValue = React.useMemo(() => ({ getAssetUrl }), [getAssetUrl]);

  const percent = Math.round(displayProgress * 100);

  return (
    <AssetGateContext.Provider value={contextValue}>
      {/* Reveal wrapper: the site fades in as one piece, all assets in hand */}
      <div
        aria-hidden={!ready}
        style={{
          opacity: ready ? 1 : 0,
          transition: "opacity 700ms ease",
        }}
      >
        {children}
      </div>

      {/* Splash screen */}
      {!gone && (
        <div
          role="status"
          aria-live="polite"
          aria-busy={!ready}
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030014] transition-opacity duration-700 ease-out ${
            ready ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          {/* Ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                "radial-gradient(circle, rgba(147,51,234,0.14) 0%, rgba(3,0,20,0) 70%)",
            }}
          />

          <div className="relative flex flex-col items-center">
            <img
              src="/reflect/images/logo.png"
              alt=""
              width={52}
              height={52}
              className="mb-5 animate-pulse rounded-[22.5%]"
              style={{
                filter: "drop-shadow(0 0 18px rgba(168,85,247,0.55))",
                boxShadow: "0 4px 24px rgba(124,58,237,0.45)",
              }}
            />

            <span className="mb-8 text-xl font-semibold tracking-[-0.015em] text-white">
              Reflect
            </span>

            {/* Progress bar */}
            <div
              className="h-[3px] w-[220px] overflow-hidden rounded-full bg-white/[0.08]"
              aria-hidden="true"
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.max(2, percent)}%`,
                  background:
                    "linear-gradient(90deg, #7c3aed 0%, #c084fc 100%)",
                  boxShadow: "0 0 12px rgba(168,85,247,0.8)",
                  transition: "width 150ms linear",
                }}
              />
            </div>

            <span
              className="mt-3 text-xs tabular-nums text-[#6e6d82]"
              aria-hidden="true"
            >
              {percent}%
            </span>

            <span className="sr-only">Loading Reflect, please wait.</span>
          </div>
        </div>
      )}
    </AssetGateContext.Provider>
  );
}
