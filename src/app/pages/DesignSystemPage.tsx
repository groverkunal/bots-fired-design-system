import React, { useState, useEffect } from "react";

import { Palette, Layout, Cpu, Monitor, Type, Droplets, FlaskConical, Files, ShieldCheck, Presentation } from "lucide-react";
import { LogoSection } from "../components/ds/LogoSection";
import { TemplatesSection } from "../components/ds/TemplatesSection";
import { ComponentsSection } from "../components/ds/ComponentsSection";
import { PlatformsSection } from "../components/ds/PlatformsSection";
import { TypographySystem } from "../components/ds/TypographySystem";
import { ColorSystem } from "../components/ds/ColorSystem";
import { VerificationTests } from "../components/ds/VerificationTests";
import { BFLogoSVG } from "../components/ds/BFLogoSVG";
import { HandwrittenNote } from "../components/shared/HandwrittenNote";

import { AssetLibrary, ApplicationsSection, GovernanceSection } from "../components/ds/LibraryCoverage";

const sections = [
  { id: "logos",       label: "Logo System",    icon: Palette,      color: "#1C2E5E" },
  { id: "typography",  label: "Typography",      icon: Type,         color: "#0D1829" },
  { id: "color",       label: "Colour System",   icon: Droplets,     color: "#E8541A" },
  { id: "templates",   label: "Templates",       icon: Layout,       color: "#D97706" },
  { id: "components",  label: "UI Components",   icon: Cpu,          color: "#4A66A0" },
  { id: "platforms",   label: "Platforms",       icon: Monitor,      color: "#2A4080" },
  { id: "applications", label: "Applications", icon: Presentation, color: "#1C2E5E" },
  { id: "assets", label: "Asset Library", icon: Files, color: "#1C2E5E" },
  { id: "governance", label: "Governance", icon: ShieldCheck, color: "#1C2E5E" },
  { id: "verify",      label: "Spec Tests",      icon: FlaskConical, color: "#166534" },
];

export function DesignSystemPage() {
  const readSection = () => sections.some(s => s.id === location.hash.slice(1)) ? location.hash.slice(1) : "logos";
  const [active, setActive] = useState(readSection);
  const [highContrast, setHighContrast] = useState(() => { try { return localStorage.getItem('botsfired-high-contrast') === 'true'; } catch { return false; } });
  const toggleContrast = () => { const next = !highContrast; setHighContrast(next); try { localStorage.setItem('botsfired-high-contrast', String(next)); } catch {} };
  useEffect(() => { const sync = () => setActive(readSection()); window.addEventListener('hashchange', sync); return () => window.removeEventListener('hashchange', sync); }, []);

  return (
    <div className="ds-hub min-h-screen bg-[#FAFAF8]" data-high-contrast={highContrast}>
      <a className="ds-skip" href="#ds-content">Skip to design system content</a>
      <header className="bg-[#0D1829] text-white">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
            <BFLogoSVG variant="wordmark" theme={highContrast ? "color" : "white"} width={210} />
            <a href="https://botsfired.com" className="text-sm text-[#D0DAE8] underline underline-offset-4">Visit BotsFired ↗</a>
          </div>
          <button type="button" onClick={toggleContrast} aria-pressed={highContrast} className="contrast-toggle px-4 py-3 mb-6 border border-white rounded-xl text-sm">High contrast: {highContrast ? 'on' : 'off'}</button>
          {highContrast && <p role="status" className="mb-5 text-sm">High-contrast reading mode simplifies interface colours. Brand graphics and downloaded files retain their original colours.</p>}
          <p className="text-sm uppercase tracking-widest text-[#F5A030] mb-3">The BotsFired brand library</p>
          <h1 className="max-w-3xl">Clarity, by design.</h1>
          <p className="max-w-2xl text-[#D0DAE8] mt-5">Everything you need to build a consistent BotsFired experience. Explore our marks, type, colours, reusable components and editorial templates.</p>
          <HandwrittenNote size="md" color="#F5A030" className="mt-5 block">No jargon. Just signal.</HandwrittenNote>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-[220px_minmax(0,1fr)] gap-8">
        <aside className="min-w-0 lg:sticky lg:top-6 self-start">
          <p className="text-xs uppercase tracking-widest font-semibold text-[#4B5563] mb-3">Explore the system</p>
          <nav aria-label="Design system sections" className="flex lg:flex-col gap-2 overflow-x-auto pb-3">
            {sections.map(({id,label,icon:Icon}) => <a key={id} href={`#${id}`} aria-current={active === id ? 'page' : undefined} className={`flex items-center gap-3 px-4 py-3 rounded-xl shrink-0 text-sm font-semibold ${active === id ? 'bg-[#1C2E5E] text-white' : 'bg-white text-[#4B5563] border border-[#E8E6E0]'}`}><Icon size={18} aria-hidden="true"/>{label}</a>)}
          </nav>
          <div className="hidden lg:block mt-6 p-4 border border-[#E8E6E0] rounded-2xl text-sm text-[#4B5563]">One brand. Ten chapters. Use the foundations first, then adapt the templates to your channel.</div>
        </aside>
        <main id="ds-content" tabIndex={-1} className="min-w-0">
          {active === "logos" && <>
            <section className="p-6 bg-white border border-[#E8E6E0] rounded-2xl mb-8">
              <h2 className="text-2xl mb-3">Brand foundations</h2>
              <p className="text-[#4B5563]">Translate AI complexity into executive clarity. Write in plain language, lead with the decision, and support claims with evidence.</p>
              <dl className="grid sm:grid-cols-2 gap-5 mt-5 text-sm">
                <div><dt className="font-bold">Spacing</dt><dd>4px base grid · 8, 12, 16, 24, 32, 48, 64px. Use 24px between related cards and 48–64px between sections.</dd></div>
                <div><dt className="font-bold">Shape &amp; layout</dt><dd>16px card radius · 24px feature radius. Keep reading text under 72 characters per line.</dd></div>
                <div><dt className="font-bold">Motion</dt><dd>Subtle 200–350ms transitions. Honour reduced-motion preferences and keep content accessible without animation.</dd></div>
                <div><dt className="font-bold">Accessibility</dt><dd>4.5:1 contrast for normal text, 3:1 for large text. Use navy or deep fire for button labels; Fire 500 with white is unsuitable for small text.</dd></div>
              </dl>
            </section><LogoSection /></>}
          {active === "typography" && <TypographySystem />}
          {active === "color" && <ColorSystem />}
          {active === "templates" && <TemplatesSection />}
          {active === "components" && <ComponentsSection />}
          {active === "platforms" && <PlatformsSection />}
          {active === "applications" && <ApplicationsSection />}
          {active === "assets" && <AssetLibrary />}
          {active === "governance" && <GovernanceSection />}
          {active === "verify" && <VerificationTests />}
          <section aria-labelledby="downloads-title" className="mt-12 p-6 bg-white border border-[#E8E6E0] rounded-2xl">
            <h2 id="downloads-title" className="text-2xl mb-3">Take the system with you</h2>
            <p className="text-sm text-[#4B5563] mb-5">Original source assets and the complete CSS token library. SVG variants can be exported from the logo gallery.</p>
            <div className="flex flex-wrap gap-3">
              <a className="ds-download" href="/assets/botsfired-primary.png" download>Primary logo · PNG</a>
              <a className="ds-download" href="/assets/botsfired-alternate.png" download>Alternate logo · PNG</a>
              <a className="ds-download" href="/assets/botsfired-tokens.css" download>Design tokens · CSS</a>
              <a className="ds-download" href="/assets/botsfired-tokens.json" download>Design tokens · JSON</a>
              <a className="ds-download" href="/assets/botsfired-guidelines.md" download>Full guidelines · Markdown</a>
            </div>
          </section>
        </main>
      </div>
      <footer className="max-w-7xl mx-auto px-6 py-8 text-sm text-[#4B5563] border-t border-[#E8E6E0]">© 2026 BotsFired · AI clarity for the people who decide.</footer>
    </div>
  );
}
