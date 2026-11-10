<div align="center">

<img src="https://reflect-clone.space-z.ai/reflect/images/logo.png" alt="Reflect Logo" width="48" />

# Reflect — Front-End Clone

**Pixel-perfect front-end recreation of [reflect.app](https://reflect.app)**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-reflect--clone.space--z.ai-black?style=for-the-badge&logo=vercel)](https://reflect-clone.space-z.ai)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Bun](https://img.shields.io/badge/Runtime-Bun-fbf0df?style=for-the-badge&logo=bun)](https://bun.sh)

</div>

---

<div align="center">

[https://github.com/islamMendjel/Reflect.app_Front-Clone/raw/main/Reflect-Preview.mp4](https://github.com/user-attachments/assets/7540f4c5-5930-4cf9-b8de-b25dde31534d)

> *Can't see the video? [Click here to watch the preview](https://reflect-clone.space-z.ai)*

</div>

---

## 🪞 What is this?

A faithful front-end clone of **[Reflect](https://reflect.app)** — an indie note-taking app known for its dark, minimal aesthetic and precise motion design. Built to sharpen UI cloning skills: extracting assets, reverse-engineering animations, reconstructing layouts section by section.

> This is a **front-end only** educational clone. No affiliation with Reflect App, LLC.

---

## ✨ What's Cloned

The site is reconstructed section by section from the original:

| Section | Description |
|---|---|
| **Hero** | Full-screen headline with animated background and looping `.webm` video |
| **Product / App showcase** | Note-taking interface screenshot with floating UI elements |
| **Never lose information** | Research & reading section with Chrome extension callout |
| **Privacy — Local files** | Privacy padlock illustration + copy block |
| **About** | Indie team section with globe aesthetic |
| **Navigation** | Sticky top nav with `Log in to Classic`, `Download`, and `✦ Meet Reflect Open` CTA |
| **Footer** | Full 3-column footer — Product, Company, Resources + newsletter form |

All original `.webm` section videos, `.webp` background, `.png` illustrations, and the Reflect logo are served locally from `/reflect/` — no external CDN dependencies.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Runtime** | Bun |
| **Styling** | Tailwind CSS v4 |
| **Components** | shadcn/ui · Radix UI (`components.json`) |
| **Linting** | ESLint (flat config, `eslint.config.mjs`) |
| **Reverse Proxy** | Caddy (`Caddyfile` included) |

---

## 📁 Project Structure

```
Reflect.app_Front-Clone/
├── src/                  # Next.js App Router source
├── public/
│   └── reflect/
│       ├── images/       # All cloned assets (logo, bg, section images)
│       └── videos/       # Section .webm videos (1st–4th page)
├── assets-original/      # Original reference assets
├── .zscripts/            # Utility scripts
├── Caddyfile             # Caddy reverse proxy config
├── tailwind.config.ts
├── next.config.ts
└── components.json       # shadcn/ui config
```

---

## ⚙️ Getting Started

### Prerequisites

- [Bun](https://bun.sh) ≥ 1.3
- Node.js ≥ 20

### 1. Clone & install

```bash
git clone https://github.com/islamMendjel/Reflect.app_Front-Clone.git
cd Reflect.app_Front-Clone
bun install
```

### 2. Run dev server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Build for production

```bash
bun run build
bun run start
```

### With Caddy (reverse proxy)

```bash
caddy run --config Caddyfile
```

---

## 🎯 Purpose

This project is a **UI cloning exercise** aimed at:

- Reverse-engineering production-grade marketing site layouts
- Matching motion design and animation timing exactly
- Practicing asset extraction and local serving
- Building pixel-accurate dark-theme interfaces with Tailwind v4

---

## ⚠️ Disclaimer

This clone is built purely for **educational and skill-development purposes**.
All design, copy, videos, and branding belong to [Reflect App, LLC](https://reflect.app).
Not affiliated with or endorsed by Reflect in any way.

---

<div align="center">

Built by [islamMendjel](https://github.com/islamMendjel) · Inspired by [reflect.app](https://reflect.app)

</div>
