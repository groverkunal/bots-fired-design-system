import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Flame } from "lucide-react";
import { BFLogoSVG } from "../ds/BFLogoSVG";

// NOTE: Logo asset must be imported from figma:asset or your local /src/imports/ folder
// import logo from "figma:asset/Gemini_Generated_Image_8us1f28us1f28us1.png";

const links = [
  { to: "/",             label: "Home" },
  { to: "/newsletter",   label: "Newsletter" },
  { to: "/podcast",      label: "Podcast" },
  { to: "/training",     label: "Training" },
  { to: "/about",        label: "About" },
  { to: "/design-system",label: "Design System" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E8E6E0]" : "bg-transparent"
      }`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <BFLogoSVG variant="wordmark" theme="color" width={115} />
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {links.map(({ to, label }) => {
              const active = location.pathname === to;
              return (
                <Link key={to} to={to} className={`relative px-4 py-2 text-sm transition-colors duration-200 rounded-xl ${
                  active ? "text-[#1C2E5E] font-semibold" : "text-[#6B7280] hover:text-[#1C2E5E] hover:bg-[#F4F3EF]"
                }`}>
                  {label}
                  {active && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-xl bg-[#EEF2F8]" style={{ zIndex: -1 }} transition={{ type: "spring", stiffness: 400, damping: 35 }} />
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <Link to="/newsletter" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1C2E5E] text-white text-sm font-semibold hover:bg-[#162244] transition-colors">
              <Flame size={14} className="text-[#F5A030]" /> Subscribe Free
            </Link>
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-xl hover:bg-[#F4F3EF] text-[#6B7280]">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-white border-b border-[#E8E6E0] shadow-lg md:hidden">
            <nav className="px-6 py-4 space-y-1">
              {links.map(({ to, label }) => (
                <Link key={to} to={to} className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  location.pathname === to ? "bg-[#EEF2F8] text-[#1C2E5E]" : "text-[#6B7280] hover:bg-[#F4F3EF]"
                }`}>{label}</Link>
              ))}
              <Link to="/newsletter" className="block mt-2 px-4 py-3 rounded-xl bg-[#1C2E5E] text-white text-sm font-semibold text-center">Subscribe Free</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
