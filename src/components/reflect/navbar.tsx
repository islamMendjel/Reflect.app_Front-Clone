"use client";

import * as React from "react";
import { BrandLogo } from "./brand-logo";

const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "Pricing", href: "#pricing" },
  { label: "Company", href: "#company" },
  { label: "Blog", href: "#blog" },
  { label: "Changelog", href: "#changelog" },
  { label: "GitHub", href: "https://github.com" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header
      className="sticky top-0 z-[100] w-full border-b border-white/[0.03]"
      style={{
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        background:
          "linear-gradient(180deg, rgba(8,6,18,0.85) 0%, rgba(8,6,18,0.4) 100%)",
      }}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-3 sm:px-8 sm:py-4"
      >
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5" aria-label="Reflect home">
          <BrandLogo size={30} />
          <span className="text-lg font-semibold tracking-[-0.015em] text-white">
            Reflect
          </span>
        </a>

        {/* Center pill nav — desktop */}
        <div
          className="hidden items-center gap-7 rounded-full border border-white/[0.08] px-6 py-2 shadow-[0_2px_10px_rgba(0,0,0,0.2)] lg:flex"
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="text-sm font-medium text-[#d4d4e2] transition-all duration-200 hover:text-white hover:[text-shadow:0_0_8px_rgba(255,255,255,0.4)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden items-center gap-5 md:flex">
          <a
            href="#login"
            className="text-sm font-medium text-[#d4d4e2] transition-colors hover:text-white"
          >
            Log in to Classic
          </a>
          <a href="#download" className="rf-btn rf-btn-download">
            Download
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-white md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            {menuOpen ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="border-t border-white/[0.06] px-5 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="rounded-lg px-3 py-3 text-[15px] font-medium text-[#d4d4e2] transition-colors hover:bg-white/5 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-4 border-t border-white/[0.06] pt-4">
            <a
              href="#login"
              className="text-sm font-medium text-[#d4d4e2]"
              onClick={() => setMenuOpen(false)}
            >
              Log in to Classic
            </a>
            <a
              href="#download"
              className="rf-btn rf-btn-download"
              onClick={() => setMenuOpen(false)}
            >
              Download
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
