import React from "react";
import { Link } from "react-router";
import { Flame, Linkedin, Twitter, Youtube, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0D1829] text-[#8FA5C8]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2 space-y-4">
            <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 800, fontStyle: "italic", fontSize: "28px", color: "#EEF2F8" }}>BOTS <span style={{ color: "#E8541A" }}>FIRED</span></span>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#8FA5C8" }}>AI clarity for the people who decide. Weekly insights, deep conversations, and executive education on artificial intelligence.</p>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Youtube, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-xl border border-[#1C2E5E] flex items-center justify-center hover:border-[#F5A030] hover:text-[#F5A030] transition-colors duration-200">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#4A66A0] mb-4">Content</p>
            <ul className="space-y-2.5">
              {[{label:"Newsletter",to:"/newsletter"},{label:"Podcast",to:"/podcast"},{label:"Training",to:"/training"},{label:"About",to:"/about"}].map(({label,to}) => (
                <li key={label}><Link to={to} className="text-sm hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#4A66A0] mb-4">Stay Sharp</p>
            <p className="text-sm mb-3">Weekly AI insights for executives — no jargon, no fluff.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="your@email.com" className="flex-1 min-w-0 px-3 py-2 rounded-xl bg-[#162244] border border-[#1C2E5E] text-white text-sm placeholder:text-[#4A66A0] outline-none focus:border-[#4A66A0] transition-colors" />
              <button className="px-3 py-2 rounded-xl bg-[#E8541A] text-white hover:bg-[#D03010] transition-colors"><Flame size={16} /></button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[#162244] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#4A66A0]">© 2026 BOTS FIRED. All rights reserved.</p>
          <span style={{ fontFamily: "Caveat, cursive", fontSize: "15px", color: "#F5A030" }}>Made for the people who lead.</span>
        </div>
      </div>
    </footer>
  );
}