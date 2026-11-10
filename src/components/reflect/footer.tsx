"use client";

import * as React from "react";
import { useToast } from "@/hooks/use-toast";
import { BrandLogo } from "./brand-logo";

const FOOTER_COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#changelog" },
      { label: "GitHub", href: "https://github.com", external: true },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Our team", href: "#team" },
      { label: "Our values", href: "#values" },
      { label: "Blog", href: "#blog" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Downloads", href: "#downloads" },
      { label: "Documentation", href: "#documentation" },
      { label: "Privacy", href: "#privacy" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = (await res.json()) as { message?: string; error?: string };

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setSubscribed(true);
      setEmail("");
      toast({
        title: "You're in! ✦",
        description: data.message || "Subscribed to the Reflect newsletter.",
      });
    } catch (err) {
      toast({
        title: "Subscription failed",
        description:
          err instanceof Error ? err.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="mt-auto border-t border-white/[0.05] px-6 pb-12 pt-16 sm:px-8 lg:pt-20">
      <div className="mx-auto max-w-[1200px]">
        {/* Top: brand + link columns */}
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="flex flex-col gap-9">
            <a href="#" className="flex items-center gap-2.5" aria-label="Reflect home">
              <BrandLogo size={34} />
              <span className="text-lg font-semibold tracking-[-0.015em] text-white">
                Reflect
              </span>
            </a>

            <div className="flex items-center gap-[18px]">
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="flex h-11 w-11 items-center justify-center text-[#7b7a8f] transition-all duration-200 hover:-translate-y-px hover:text-white"
              >
                <DiscordIcon />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="flex h-11 w-11 items-center justify-center text-[#7b7a8f] transition-all duration-200 hover:-translate-y-px hover:text-white"
              >
                <XIcon />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-x-16 lg:gap-x-24">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.heading}>
                <h4 className="mb-[18px] text-[0.938rem] font-semibold tracking-[-0.01em] text-white">
                  {col.heading}
                </h4>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="text-sm font-normal text-[#9d9cb2] transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-9 h-px bg-white/[0.08]" />

        {/* Newsletter */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="mb-1.5 text-xl font-semibold tracking-[-0.015em] text-white">
              Join our newsletter
            </h3>
            <p className="text-sm text-[#9d9cb2]">
              Keep up to date with everything Reflect
            </p>
          </div>

          <form
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3"
            onSubmit={handleSubmit}
            noValidate
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-white/[0.12] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none transition-all duration-200 placeholder:text-[#6e6d82] focus:border-[rgba(168,85,247,0.6)] focus:bg-white/[0.05] sm:w-[280px]"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setSubscribed(false);
              }}
              disabled={submitting}
              required
            />
            <button
              type="submit"
              className="rf-btn h-[42px] rounded-lg border border-white/[0.14] bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:border-white/25 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={submitting}
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-90"
                      fill="currentColor"
                      d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Subscribing…
                </span>
              ) : subscribed ? (
                "Subscribed ✓"
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
        </div>

        {/* Divider */}
        <div className="my-9 h-px bg-white/[0.08]" />

        {/* Legal + copyright */}
        <div className="flex flex-col items-start gap-3 text-[0.813rem] text-[#6e6d82] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <a href="#privacy-policy" className="transition-colors hover:text-[#9d9cb2]">
              Privacy Policy
            </a>
            <span aria-hidden="true" className="text-[#434252]">
              ·
            </span>
            <a
              href="#terms-and-conditions"
              className="transition-colors hover:text-[#9d9cb2]"
            >
              Terms and Conditions
            </a>
          </div>
          <p>Reflect App, LLC. All rights reserved.</p>
        </div>

        {/* Clone disclaimer */}
        <p className="mt-4 text-center text-[0.75rem] leading-relaxed text-[#5a5968]">
          This website is an educational clone built to improve front-end UI
          design skills — not affiliated with Reflect App, LLC.
        </p>
      </div>
    </footer>
  );
}
