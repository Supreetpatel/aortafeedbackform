"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const TripzortForm = dynamic(() => import("../components/TripzortForm.jsx"), {
  ssr: false,
});
import { motion, AnimatePresence } from "framer-motion";

const BRAND = {
  brandName: "Tripzort",
  tagline:
    "Travel, food & hotel discovery for Indian travelers. You're here because someone from the Tripzort team reached out to you personally.",
  coords: "20.2961°N · 85.8245°E · Bhubaneswar",
  hotelsListed: 15,
  destinations: 3,
  instagramHandle: "@tripzort",
  linkedInHandle: "Tripzort",
  founderHandle: "@peekswithkaushal",
  whyStarted:
    "I do long routes on my motorcycle. Every time — somewhere between packing my bag and hitting the road — the same thing would happen. Hours trying to find a decent place to stay. The photos lied. The reviews were fine on paper. The actual scenario was completely different.",
  whyQuote:
    '"Bhai, goa wali wo konsi reel bheji thi?" — and him laughing: yaad nhi, kaafi pehle bheja tha.',
  founderCredit: "Kaushal · Founder & Traveller, Tripzort",
  features: [
    {
      title: "PEEKS",
      desc: "Short videos of places shot by people who've been there. Watch it, feel it, before you book it.",
    },
    {
      title: "TATKAL",
      desc: "Last-minute plans. Zero patience. Why pay for a full day when you only need the night?",
    },
    {
      title: "FOOD",
      desc: "Cafes, dhabas, shacks, hidden spots. The ones that matter — not the ones that trend.",
    },
  ],
  closingLine: "Launching in Odisha.",
};

const CITIES_GEO = [
  [180, 120, "Bhubaneswar", true, 0],
  [272, 196, "Puri", false, 0.4],
  [168, 160, "Khurda", false, 0.7],
  [90, 80, "Sambalpur", false, 1.0],
  [60, 160, "Koraput", false, 1.3],
  [260, 90, "Balasore", false, 0.6],
  [200, 60, "Cuttack", false, 0.2],
  [130, 110, "Angul", false, 0.9],
  [300, 150, "Berhampur", false, 1.1],
  [80, 210, "Daringbadi", false, 1.5],
];

const ODISHA_PATH =
  "M 260 30 L 295 45 L 320 70 L 330 100 L 325 130 L 310 155 L 295 175 L 270 190 L 240 200 L 210 210 L 185 215 L 160 210 L 140 195 L 120 180 L 100 165 L 80 155 L 60 160 L 45 175 L 40 190 L 50 210 L 65 225 L 85 230 L 100 220 L 110 230 L 120 245 L 140 255 L 165 258 L 185 255 L 200 262 L 210 255 L 220 245 L 230 250 L 245 258 L 265 255 L 280 240 L 290 225 L 295 210 L 290 195 L 280 185 L 285 170 L 300 160 L 315 145 L 325 125 L 330 100 L 320 70 L 295 45 L 260 30";

function OdishaMap() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden rounded-xl bg-linear-to-br from-[#1A4D2E] to-[#0A1C10] p-1.5 shadow-[inset_0_0_30px_rgba(0,0,0,0.4)]"
    >
      <motion.svg
        viewBox="0 0 380 270"
        className="block w-full"
        animate={{
          filter: [
            "drop-shadow(0 0 2px #3B8A5888)",
            "drop-shadow(0 0 8px #3B8A58CC)",
            "drop-shadow(0 0 2px #3B8A5888)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <pattern
            id="grid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="380" height="270" fill="url(#grid)" />
        <path
          d="M 270 185 Q 310 175 350 185 L 370 200 L 370 270 L 260 270 Z"
          fill="rgba(20,70,130,0.30)"
        />
        <text
          x="310"
          y="248"
          fontSize="6.5"
          fill="rgba(100,160,200,0.55)"
          className="font-mono tracking-widest uppercase"
        >
          Bay of Bengal
        </text>
        <path
          d={ODISHA_PATH}
          fill="rgba(45,107,68,0.45)"
          stroke="#3B8A58"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {CITIES_GEO.map(([x, y, name, isCapital, delay], i) => (
          <g key={name}>
            <circle
              cx={x}
              cy={y}
              r={isCapital ? 7 : 5}
              fill="rgba(10,28,16,0.8)"
              stroke={isCapital ? "#C8D828" : "#3B8A58"}
              strokeWidth={isCapital ? 1.5 : 1}
            />
            <motion.circle
              cx={x}
              cy={y}
              r={isCapital ? 3 : 2}
              fill={isCapital ? "#C8D828" : "#7ABB88"}
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, delay: delay }}
            />
            <text
              x={x + (x > 200 ? -5 : 8)}
              y={y + (isCapital ? -9 : -6)}
              fontSize={isCapital ? 8 : 7}
              fill={isCapital ? "#C8D828" : "rgba(180,210,188,0.85)"}
              className={`font-mono ${isCapital ? "font-bold" : "font-normal"}`}
              textAnchor={x > 200 ? "end" : "start"}
            >
              {name}
            </text>
          </g>
        ))}
      </motion.svg>
    </motion.div>
  );
}

function LogDiscoverHero() {
  return (
    <div className="font-mono leading-none mb-4">
      <div className="flex items-baseline gap-0">
        <span className="text-[28px] font-medium text-[#0A1C10] tracking-tight">
          Log
        </span>
        <motion.span
          initial={{ y: 5 }}
          animate={{ y: 10 }}
          className="text-sm font-bold text-[#3B8A58] tracking-wider"
        >
          discover
        </motion.span>
        <span className="text-[28px] font-medium text-[#0A1C10] ml-1">
          &#40;
        </span>
        <span className="text-2xl font-semibold text-[#0A1C10]">Travel</span>
        <span className="text-lg text-[#5A8060] mx-1">*</span>
        <span className="text-2xl font-semibold text-[#0A1C10]">Food</span>
        <span className="text-lg text-[#5A8060] mx-1">*</span>
        <span className="text-2xl font-semibold text-[#0A1C10]">Hotel</span>
        <span className="text-[28px] font-medium text-[#0A1C10]">&#41;</span>
      </div>
      <div className="text-[10px] text-[#5A8060] tracking-widest mt-4 font-mono">
        ↳ Discover the road. Book the stay. Find the food.
      </div>
    </div>
  );
}

export default function TripzortLanding() {
  const [screen, setScreen] = useState("home");
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    // Outer container: Remove padding on mobile
    <div className="flex items-center justify-center min-h-screen bg-[#E5E2D8] p-0 md:p-4">
      {/* Main Container: Full width/height on mobile, card style on desktop */}
      <div className="w-full h-full fixed inset-0 md:relative md:inset-auto md:w-110 md:h-[85vh] bg-[#F5F2E8] text-[#0A1C10] md:rounded-2xl overflow-hidden shadow-2xl flex flex-col border-none md:border md:border-[#D8D5C8]">
        {/* HEADER */}
        <header className="bg-linear-to-br from-[#0A1C10] via-[#0F2D18] to-[#0A2010] p-4 relative z-10 border-b border-[#1A3322] shrink-0">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setScreen("home")}
              className="flex items-center gap-2 group transition-opacity active:opacity-70"
            >
              <div className="w-7 h-7 rounded-lg bg-[#3B8A58]/20 border border-[#3B8A58]/40 flex items-center justify-center text-sm">
                📍
              </div>
              <h1 className="font-black text-3xl tracking-widest text-[#3B8A58] font-serif uppercase">
                Tripzort
              </h1>
            </button>
            <div className="bg-[#3B8A58]/10 border border-[#3B8A58]/30 rounded-full px-3 py-0.5">
              <span className="font-mono text-[10px] text-[#3B8A58] font-bold">
                BETA
              </span>
            </div>
          </div>
        </header>

        {/* TICKER */}
        <div className="bg-[#0F1E15] overflow-hidden py-1.5 border-b border-[#1A3522] shrink-0">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap w-max"
          >
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className="font-mono text-[9px] text-[#7ABB88]/50 px-10 tracking-widest uppercase"
              >
                Launching soon in Odisha &nbsp;·&nbsp; Discover destinations
                &nbsp;·&nbsp; Cafes and Hotels
              </span>
            ))}
          </motion.div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-5 relative">
          <AnimatePresence mode="wait">
            {screen === "home" ? (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <LogDiscoverHero />
                <p className="text-[14px] leading-relaxed text-[#1E4028] mb-6 opacity-90">
                  {BRAND.tagline}
                </p>

                <OdishaMap />

                {/* Stats Grid */}
                <div className="grid grid-cols-4 border border-[#D8D5C8] rounded-xl bg-white/50 backdrop-blur-sm overflow-hidden my-6">
                  {[
                    [`${BRAND.hotelsListed}+`, "Hotels"],
                    [`${BRAND.destinations}`, "Cities"],
                    ["4", "Features"],
                    ["∞", "Coming"],
                  ].map(([v, l], i) => (
                    <div
                      key={l}
                      className={`p-3 text-center ${i < 3 ? "border-r border-[#D8D5C8]" : ""}`}
                    >
                      <div className="text-xl font-black text-[#0A1C10] leading-none">
                        {v}
                      </div>
                      <div className="text-[9px] font-mono text-[#5A8060] uppercase mt-1 tracking-tighter">
                        {l}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setScreen("about")}
                  className="w-full bg-white border border-[#D8D5C8] p-4 text-left rounded-xl shadow-sm hover:border-[#3B8A58] transition-colors mb-4 group"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-[15px] font-bold text-[#0A1C10] group-hover:text-[#3B8A58]">
                        The Story & About Tripzort
                      </div>
                      <div className="text-[11px] text-[#5A8060]">
                        Why it was built · what it is · where it&apos;s going
                      </div>
                    </div>
                    <span className="text-xl opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      →
                    </span>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowFeedback(true)}
                  className="w-full bg-[#0F1E15] border p-4 text-left rounded-xl shadow-sm transition-colors mb-4 group"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-[15px] font-bold text-[#7ABB88]/50 group-hover:text-[#3B8A58]">
                        Help Us To Improve
                      </div>
                    </div>
                    <span className="text-xl opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#7ABB88]/50">
                      →
                    </span>
                  </div>
                </motion.button>

                {showFeedback && (
                  // Overlay: Full screen on mobile, absolute within card on desktop
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm md:absolute">
                    <div className="relative w-full h-full md:h-auto md:max-w-xl mx-auto bg-white md:rounded-2xl shadow-2xl overflow-hidden">
                      <button
                        onClick={() => setShowFeedback(false)}
                        className="absolute top-4 right-4 z- bg-[#0A1C10] text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#3B8A58] transition shadow-lg"
                        aria-label="Close feedback form"
                      >
                        ×
                      </button>
                      <TripzortForm />
                    </div>
                  </div>
                )}

                <div className="bg-white/40 border border-[#D8D5C8] rounded-xl p-4 flex flex-col gap-3">
                  <span className="text-[10px] font-mono uppercase text-[#5A8060] tracking-widest">
                    Follow us
                  </span>
                  <a
                    href="https://instagram.com/tripzort"
                    className="flex justify-between items-center text-xs font-bold font-mono hover:text-[#3B8A58] transition-colors w-full"
                  >
                    <span>Instagram</span>
                    <span className="opacity-70">{BRAND.instagramHandle}</span>
                  </a>
                  <a
                    href="https://linkedin.com/company/tripzort"
                    className="flex justify-between items-center text-xs font-bold font-mono hover:text-[#3B8A58] transition-colors w-full"
                  >
                    <span>LinkedIn</span>
                    <span className="opacity-70">{BRAND.linkedInHandle}</span>
                  </a>
                  <a
                    href="https://instagram.com/peekswithkaushal"
                    className="flex justify-between items-center text-xs font-bold font-mono hover:text-[#3B8A58] transition-colors w-full"
                  >
                    <span>Founder</span>
                    <span className="opacity-70">{BRAND.founderHandle}</span>
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="about"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => setScreen("home")}
                  className="mb-6 flex items-center gap-2 text-[10px] font-mono font-bold border border-[#D8D5C8] px-3 py-1.5 rounded-lg bg-white/50 hover:bg-white active:scale-95 transition-all"
                >
                  ← BACK TO HOME
                </button>

                <div className="bg-[#0A1C10] rounded-2xl p-6 text-[#C4BEA2] mb-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl italic font-serif">
                    &quot;
                  </div>
                  <p className="text-[9px] font-mono text-[#4A7055] uppercase tracking-[0.2em] mb-4">
                    THE GENESIS
                  </p>
                  <p className="text-[14px] leading-relaxed mb-4 italic opacity-90">
                    {BRAND.whyStarted}
                  </p>
                  <div className="border-l-2 border-[#3B8A58] pl-4 py-1 mb-6">
                    <p className="text-[13px] font-medium text-white italic leading-snug">
                      {BRAND.whyQuote}
                    </p>
                  </div>
                  <p className="text-[10px] font-mono text-[#4A7055] text-right">
                    — {BRAND.founderCredit}
                  </p>
                </div>

                <div className="space-y-3">
                  {BRAND.features.map((item) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="bg-white border border-[#D8D5C8] p-4 rounded-xl hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-black text-xs tracking-[0.2em] text-[#0A1C10] mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#2E6040] leading-relaxed">
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* FOOTER */}
        <footer className="bg-[#0A1C10] p-4 text-center border-t border-[#1A3322] shrink-0">
          <motion.span
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="font-black text-sm tracking-[0.3em] text-[#3B8A58] uppercase"
          >
            {BRAND.closingLine}
          </motion.span>
          <div className="text-[8px] font-mono text-[#5A8060] mt-1 tracking-widest uppercase opacity-50">
            © 2026 Tripzort Discovery Platform
          </div>
        </footer>
      </div>
    </div>
  );
}
