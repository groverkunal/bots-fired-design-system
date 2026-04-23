import React from "react";
import { createBrowserRouter, Outlet } from "react-router";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { HomePage } from "./pages/HomePage";
import { NewsletterPage } from "./pages/NewsletterPage";
import { PodcastPage } from "./pages/PodcastPage";
import { TrainingPage } from "./pages/TrainingPage";
import { AboutPage } from "./pages/AboutPage";
import { DesignSystemPage } from "./pages/DesignSystemPage";

function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8] pt-24">
      <div className="text-center">
        <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '80px', fontWeight: 800, color: '#EEF2F8', lineHeight: 1 }}>404</p>
        <h2 style={{ color: '#1C2E5E' }} className="mb-3">Page not found</h2>
        <a href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1C2E5E] text-white text-sm font-semibold">Back to Home</a>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "newsletter", Component: NewsletterPage },
      { path: "podcast", Component: PodcastPage },
      { path: "training", Component: TrainingPage },
      { path: "about", Component: AboutPage },
      { path: "design-system", Component: DesignSystemPage },
      { path: "*", Component: NotFound },
    ],
  },
]);