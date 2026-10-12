# BOTS FIRED — Design System Hub

> **AI Clarity for C-Suite Leaders** · Premium AI education platform for executives, board members, and senior leaders.

[![Live App](https://img.shields.io/badge/Live%20App-Figma%20Make-blue?style=flat-square)](https://github.com/groverkunal/bots-fired-design-system)
[![Design System](https://img.shields.io/badge/Route-/design--system-orange?style=flat-square)](#)
[![WCAG](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA%2FAAA-green?style=flat-square)](#colour-system)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

---

## Overview

**BOTS FIRED** is a premium AI education platform built for executive audiences. The brand combines bold, authoritative design with warm human touches — a minimalist palette anchored in navy and fire orange, editorial typography using Barlow Condensed, and handwritten Caveat annotations that signal "no jargon, just signal."

This repository contains the full **Design System Hub**, a living specification and QA tool that defines every visual and typographic decision made across the platform's five core pages.

---

## Platform Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Hero, value proposition, inline CTAs |
| Newsletter | `/newsletter` | Weekly AI briefings for executives |
| Podcast | `/podcast` | Audio deep-dives on AI leadership |
| Training | `/training` | Executive AI training sessions |
| About | `/about` | Team and brand story |
| **Design System** | `/design-system` | Living spec hub ← this repo |

---

## Design System Sections

The Design System Hub (`/design-system`) is structured into **7 sections**, each accessible via the sticky sidebar nav:

### 1. Logo System (`LogoSection`)
- Primary photo logo: bold italic navy lettering + fire flame accent + gold sparkles
- SVG wordmark variant for dark/light surfaces
- Clear-space rules, minimum sizing, and do/don't examples
- Both logo assets: `Gemini_Generated_Image_8us1f28us1f28us1.png` and `Gemini_Generated_Image_8w18gl8w18gl8w18.png`

### 2. Typography System (`TypographySystem.tsx`)
A deeply-engineered **17-token type scale** built on a Major Third (1.25×) progression with a strict 4px grid.

| Token | Family | Weight | Size | Line Height | Usage |
|---|---|---|---|---|---|
| `display-2xl` | Barlow Condensed | 800 | 80px | 1.0 | Hero masthead |
| `display-xl` | Barlow Condensed | 800 | 64px | 1.0625 | Section heroes |
| `display-l` | Barlow Condensed | 800 | 48px | 1.083 | Page titles |
| `display-m` | Barlow Condensed | 700 | 40px | 1.1 | Card headlines |
| `h1` | Barlow Condensed | 700 | 36px | 1.222 | Primary headings |
| `h2` | Barlow Condensed | 700 | 28px | 1.286 | Section titles |
| `h3` | Barlow Condensed | 600 | 24px | 1.333 | Sub-section heads |
| `h4` | Inter | 700 | 20px | 1.4 | Card titles |
| `body` | Inter | 400 | 16px | 1.75 | All body copy |
| `body-s` | Inter | 400 | 14px | 1.714 | Secondary copy |
| `caption` | Inter | 500 | 12px | 1.667 | Labels, metadata |
| `overline` | Inter | 700 | 11px | 1.455 | Kickers (UPPERCASE, +2.5px ls) |
| `handwritten` | Caveat | 600 | 20px | 1.4 | Annotations, brand voice |
| `mono` | JetBrains Mono | 500 | 13px | 1.538 | Issue numbers, code |

**Font stacks loaded:** Barlow Condensed (400/600/700/800) · Inter (400/500/600/700) · Caveat (400/600/700) · JetBrains Mono (500/700)

### 3. Colour System (`ColorSystem.tsx`)
Full **Fire Color Profile** with WCAG 2.1 contrast matrix.

#### Brand Palette

| Token | Hex | Role |
|---|---|---|
| Navy 500 | `#1C2E5E` | Primary / Brand |
| Navy 800 | `#0D1829` | Deep Backgrounds |
| Navy 300 | `#4A66A0` | Interactive / Links |
| Fire 500 | `#E8541A` | Primary CTA / Accent |
| Fire 300 | `#F07848` | Hover states |
| Gold 400 | `#F5A030` | Highlights / AI accent |
| Amber | `#D97706` | Handwritten annotations |
| Warm 50 | `#FAFAF8` | Page background |
| Warm 200 | `#E8E6E0` | Borders / dividers |
| Ink 600 | `#4B5563` | Body text |
| Ink 500 | `#6B7280` | Secondary text |

#### Key WCAG Pairings

| Foreground | Background | Ratio | Rating |
|---|---|---|---|
| `#1C2E5E` | `#FFFFFF` | 10.3:1 | **AAA** |
| `#FFFFFF` | `#0D1829` | 17.4:1 | **AAA** |
| `#F5A030` | `#0D1829` | 8.7:1 | **AAA** |
| `#4B5563` | `#FFFFFF` | 5.9:1 | **AA** |
| `#E8541A` | `#FFFFFF` | 3.6:1 | AA large |
| `#D97706` | `#FFFFFF` | 3.0:1 | FAIL (dark-bg only) |
| `#F5A030` | `#FFFFFF` | 2.4:1 | FAIL (dark-bg only) |

### 4. Templates (`TemplatesSection`)
- Newsletter card template
- Podcast episode card template
- Training CTA block template

### 5. UI Components (`ComponentsSection`)
- Buttons (primary, secondary, ghost, danger)
- Cards (content, episode, training)
- Badges and overline labels
- Form elements

### 6. Platforms (`PlatformsSection`)
- Responsive breakpoints: Mobile 375px · Tablet 768px · Desktop 1280px · Wide 1440px
- Platform-specific typography and spacing adjustments

### 7. Spec Tests (`VerificationTests.tsx`)
**22 automated design spec verification tests** + interactive tools.

---

## Verification Tests (`VerificationTests.tsx`)

The crown jewel of the design system — a live QA suite that runs directly in the browser against the actual DOM.

### Test Categories

#### Typography (6 tests)
| ID | Test | Spec |
|---|---|---|
| t01 | Base font size = 16px | Root `font-size: 16px` |
| t02 | Body line-height ≥ 1.6 | `line-height / font-size ≥ 1.6` |
| t03 | H1 uses Barlow Condensed | `font-family` includes `barlow` |
| t04 | H1 font-size ≥ 32px | Minimum display-m (40px on large) |
| t05 | Minimum font size ≥ 12px | Caption floor at 12px |
| t06 | ≤ 3 font families per view | Barlow + Inter + Caveat (+ JetBrains optional) |

#### Colour (8 tests)
| ID | Test | Spec |
|---|---|---|
| c01 | Navy 500 on white = AAA | `#1C2E5E` / `#FFFFFF` ≥ 7:1 |
| c02 | Fire 500 on white = AA | `#E8541A` / `#FFFFFF` ≥ 4.5:1 |
| c03 | White on Fire 500 = AA large | ≥ 3:1 for button text |
| c04 | Gold on Navy 800 = AAA | `#F5A030` / `#0D1829` ≥ 7:1 |
| c05 | Amber on white FAILS (expected) | Validates dark-bg-only rule |
| c06 | Gold on white FAILS (expected) | Validates dark-bg-only rule |
| c07 | Body text (Ink 600) on white = AA | `#4B5563` / `#FFFFFF` ≥ 4.5:1 |
| c08 | White on Navy 800 = AAA | `#FFFFFF` / `#0D1829` ≥ 7:1 |

#### Spacing (3 tests)
| ID | Test | Spec |
|---|---|---|
| s01 | Paragraph margin on 4px grid | `margin-bottom % 4 === 0` |
| s02 | Touch targets ≥ 44px | WCAG 2.5.5 — all buttons/links |
| s03 | Cards use rounded-2xl or larger | 16px minimum brand radius |

#### Brand (3 tests)
| ID | Test | Spec |
|---|---|---|
| b01 | Logo images load successfully | Both `alt="BOTS FIRED"` imgs present |
| b02 | Single H1 per page (SEO) | Exactly 1 `<h1>` element |
| b03 | Caveat font used for annotations | At least one element with `caveat` |

#### Accessibility (3 tests)
| ID | Test | Spec |
|---|---|---|
| a01 | All images have alt text | No `<img>` missing `alt` attribute |
| a02 | Buttons have accessible text | Text or `aria-label` on every `<button>` |
| a03 | Focus indicators present | `:focus-visible` / ring styles in DOM |

### Interactive Tools

1. **WCAG Contrast Checker** — Real-time foreground/background contrast calculator with 8 brand presets, live preview of Display/Body/Overline text, and ratings for normal text, large text, and UI components
2. **Type Token Spec Validator** — Select any of the 14 type tokens to see: live rendered preview, major-third scale bar chart, full CSS output, and spec table (family · weight · size · rem · line-height · letter-spacing · paragraph-spacing)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Styling | Tailwind CSS v4 |
| Routing | React Router (Data Mode) |
| Animation | Motion (`motion/react`) |
| Icons | Lucide React |
| Fonts | Google Fonts (Barlow Condensed, Inter, Caveat, JetBrains Mono) |
| Build | Vite |

---

## Project Structure

```
src/
├── app/
│   ├── App.tsx                          # Root with RouterProvider
│   ├── routes.tsx                       # All routes wired (/, /newsletter, /podcast, /training, /about, /design-system)
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── NewsletterPage.tsx
│   │   ├── PodcastPage.tsx
│   │   ├── TrainingPage.tsx
│   │   ├── AboutPage.tsx
│   │   └── DesignSystemPage.tsx         # Design System Hub shell
│   └── components/
│       ├── layout/
│       │   ├── Navbar.tsx               # Global nav with /design-system link
│       │   └── Footer.tsx
│       ├── shared/
│       │   ├── HandwrittenNote.tsx      # Caveat font annotation component
│       │   ├── AnimatedSection.tsx      # Scroll-triggered motion wrapper
│       │   └── AIFrameworkDiagram.tsx   # SVG diagram component
│       └── ds/                          # Design System spec components
│           ├── BFLogoSVG.tsx            # SVG wordmark + photo logo
│           ├── LogoSection.tsx          # Logo usage rules
│           ├── TypographySystem.tsx     # 17-token type scale spec
│           ├── ColorSystem.tsx          # Fire color profile + WCAG matrix
│           ├── TemplatesSection.tsx     # Page template previews
│           ├── ComponentsSection.tsx    # UI component library
│           ├── PlatformsSection.tsx     # Responsive platform specs
│           └── VerificationTests.tsx   # 22 automated QA tests + tools ✦
├── imports/
│   ├── Gemini_Generated_Image_8us1f28us1f28us1.png   # Primary logo
│   └── Gemini_Generated_Image_8w18gl8w18gl8w18.png   # Secondary logo
└── styles/
    ├── fonts.css                        # Google Fonts imports
    ├── theme.css                        # Design tokens & CSS custom properties
    └── index.css                        # Global base styles
```

---

## Design Principles

1. **Minimalist with purpose** — White space is strategic, not empty
2. **Rounded at every scale** — `rounded-3xl` as the brand radius signature
3. **Handwritten annotations** — Caveat font adds human warmth to data-heavy content
4. **SVG diagrams over text** — Visual frameworks replace walls of copy
5. **Inline CTAs only** — No popups, no modals for conversion actions
6. **Scroll-triggered motion** — Material Design-inspired entrance animations via Motion
7. **Readability first** — Maximum 72ch line length, 1.75 body line-height, 16px floor

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open the design system
open http://localhost:5173/design-system
```

---

## Commit History

| Commit | Contents |
|---|---|
| `feat: foundation/config` | Vite config, Tailwind v4, font imports, theme tokens |
| `feat: layout components` | Navbar, Footer, AnimatedSection, HandwrittenNote, AIFrameworkDiagram |
| `feat: DesignSystemPage` | Hub shell with 7-section sidebar navigation |
| `feat: TypographySystem` | 17-token type scale spec with live previews |
| `feat: ColorSystem` | Fire color profile + full WCAG contrast matrix |
| `feat: VerificationTests + README` | 22 automated QA tests, contrast checker, type validator, this README |

---

## Brand Voice

> *"No jargon. Just signal."*

BOTS FIRED translates AI complexity into executive clarity. The design system encodes this promise: every typographic decision, colour pairing, and animation choice is intentional, documented, and verifiable.

---

*Built with Figma Make · Maintained by [@groverkunal](https://github.com/groverkunal)*
