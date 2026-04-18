"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import { createClient } from "@/utils/supabase/client";

// ── PALETTE (MATCHING LANDING PAGE) ───────────────────────
const C = {
  bg: "#F5F2E8",
  surface: "#FFFFFF",
  ink: "#0A1C10",
  inkSec: "#1E4028",
  inkMuted: "#5A8060",
  greenAcc: "#3B8A58",
  yellow: "#C8D828",
  border: "#D8D5C8",
};

const ODISHA_PATH =
  "M 260 30 L 295 45 L 320 70 L 330 100 L 325 130 L 310 155 L 295 175 L 270 190 L 240 200 L 210 210 L 185 215 L 160 210 L 140 195 L 120 180 L 100 165 L 80 155 L 60 160 L 45 175 L 40 190 L 50 210 L 65 225 L 85 230 L 100 220 L 110 230 L 120 245 L 140 255 L 165 258 L 185 255 L 200 262 L 210 255 L 220 245 L 230 250 L 245 258 L 265 255 L 280 240 L 290 225 L 295 210 L 290 195 L 280 185 L 285 170 L 300 160 L 315 145 L 325 125 L 330 100 L 320 70 L 295 45 L 260 30";

// ── ANIMATION VARIANTS ────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

export default function TripzortForm() {
  const supabase = createClient();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    source: "",
    platform: "",
    area: "",
    problemTypes: [],
    raw: "",
  });

  const next = () => setStep((s) => s + 1);

  const resetForm = () => {
    setForm({ source: "", platform: "", area: "", problemTypes: [], raw: "" });
    setStep(1);
  };

  const handleFinalSubmit = async () => {
    if (!form.raw.trim()) {
      toast.error("Please add some details...");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("feedback").insert([
        {
          source: form.source,
          platform: form.platform,
          area: form.area,
          problem_types: form.problemTypes,
          raw_text: form.raw,
        },
      ]);
      if (error) throw error;
      toast.success("Feedback Received", {
        style: {
          background: C.ink,
          color: "#fff",
          fontSize: "12px",
          fontFamily: "monospace",
        },
      });
      setStep(6);
    } catch (error) {
      console.error(error.message);
      toast.error("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  const toggleProblem = (val) => {
    setForm((prev) => ({
      ...prev,
      problemTypes: prev.problemTypes.includes(val)
        ? prev.problemTypes.filter((i) => i !== val)
        : [...prev.problemTypes, val],
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E5E2D8] p-4 font-sans">
      <Toaster position="bottom-center" />

      <div className="w-full max-w-110 bg-[#F5F2E8] text-[#0A1C10] rounded-2xl overflow-hidden shadow-2xl flex flex-col min-h-162.5 border border-[#D8D5C8]">
        {/* HEADER (MATCHING LANDING) */}
        <header className="bg-linear-to-br from-[#0A1C10] via-[#0F2D18] to-[#0A2010] p-4 relative border-b border-[#1A3322]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#3B8A58]/20 border border-[#3B8A58]/40 flex items-center justify-center text-sm">
                📍
              </div>
              <h1 className="font-black text-3xl tracking-widest text-[#3B8A58] uppercase">
                Tripzort
              </h1>
            </div>
            <div className="flex gap-1.5">
              {[
                "Building Tripzort together",
                "Share your feedback",
                "Odisha's Discovery Engine",
              ].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 w-4 rounded-full transition-colors duration-500 ${step >= i ? "bg-[#3B8A58]" : "bg-[#3B8A58]/20"}`}
                />
              ))}
            </div>
          </div>
        </header>

        {/* TICKER */}
        <div className="bg-[#0F1E15] overflow-hidden py-1.5 border-b border-[#1A3522]">
          <motion.div
            animate={{ x: [0, -800] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap w-max font-mono text-[9px] text-[#7ABB88]/50 tracking-widest uppercase"
          >
            {[
              "Building Tripzort together",
              "Share your feedback",
              "Odisha's Discovery Engine",
            ].map((i) => (
              <span key={i} className="px-10">
                {i}
              </span>
            ))}
          </motion.div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-6 relative">
          {/* ARTISTIC MAP BACKGROUND (Subtle Watermark) */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 380 270" className="w-[180%] h-auto -rotate-12">
              <path
                d={ODISHA_PATH}
                fill="none"
                stroke={C.ink}
                strokeWidth="2"
              />
            </svg>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="1" {...fadeUp} className="space-y-4">
                <p className="font-mono text-[10px] text-[#5A8060] uppercase tracking-widest">
                  01. Identity
                </p>
                <h2 className="text-2xl font-black text-ink tracking-tight mb-6">
                  How did you find us?
                </h2>
                <div className="space-y-2">
                  {[
                    "Friend of Kaushal",
                    "From Instagram",
                    "From Reddit",
                    "Traveler/Creator",
                    "Someone shared this",
                    "Just exploring",
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setForm({ ...form, source: opt });
                        next();
                      }}
                      className="w-full text-left p-4 rounded-xl border border-[#D8D5C8] bg-white hover:border-[#3B8A58] hover:bg-[#EEF0E6] transition-all font-bold text-sm"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="2" {...fadeUp} className="space-y-4">
                <p className="font-mono text-[10px] text-[#5A8060] uppercase tracking-widest">
                  02. Platform
                </p>
                <h2 className="text-2xl font-black text-ink tracking-tight mb-6">
                  Where do we talk?
                </h2>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    "WhatsApp",
                    "Instagram",
                    "Reddit",
                    "LinkedIn",
                    "In Person",
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setForm({ ...form, platform: opt });
                        next();
                      }}
                      className="w-full text-left p-4 rounded-xl border border-[#D8D5C8] bg-white hover:border-[#3B8A58] transition-all font-bold text-sm"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="3" {...fadeUp} className="space-y-4">
                <p className="font-mono text-[10px] text-[#5A8060] uppercase tracking-widest">
                  03. Segment
                </p>
                <h2 className="text-2xl font-black text-ink tracking-tight mb-6">
                  What were you using?
                </h2>
                <div className="space-y-2">
                  {[
                    "Peeks (Videos)",
                    "Searching Hotels",
                    "Booking Flow",
                    "App Speed/Design",
                    "Food Discovery",
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setForm({ ...form, area: opt });
                        next();
                      }}
                      className="w-full text-left p-4 rounded-xl border border-[#D8D5C8] bg-white hover:border-[#3B8A58] transition-all font-bold text-sm"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="4" {...fadeUp} className="space-y-4">
                <p className="font-mono text-[10px] text-[#5A8060] uppercase tracking-widest">
                  04. Insights
                </p>
                <h2 className="text-2xl font-black text-ink tracking-tight mb-4">
                  Any specific issues?
                </h2>
                <div className="space-y-2 mb-6">
                  {[
                    "App Crashed",
                    "Too many steps",
                    "Broken links",
                    "Confusing UI",
                    "Slow Loading",
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => toggleProblem(opt)}
                      className={`w-full text-left p-4 rounded-xl border transition-all font-bold text-sm flex justify-between items-center ${
                        form.problemTypes.includes(opt)
                          ? "bg-[#0A1C10] text-[#C8D828] border-[#0A1C10]"
                          : "bg-white border-[#D8D5C8]"
                      }`}
                    >
                      {opt}
                      {form.problemTypes.includes(opt) && <span>✓</span>}
                    </button>
                  ))}
                </div>
                <button
                  onClick={next}
                  className="w-full bg-[#3B8A58] text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg"
                >
                  Next Step
                </button>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div key="5" {...fadeUp} className="space-y-4">
                <p className="font-mono text-[10px] text-[#5A8060] uppercase tracking-widest">
                  05. Notes
                </p>
                <h2 className="text-2xl font-black text-ink tracking-tight">
                  The floor is yours.
                </h2>
                <textarea
                  onChange={(e) => setForm({ ...form, raw: e.target.value })}
                  className="w-full h-40 bg-white border border-[#D8D5C8] rounded-xl p-4 outline-none focus:ring-2 ring-[#3B8A58]/20 transition-all text-sm"
                  placeholder="Tell us what sucked or what you loved..."
                />
                <button
                  disabled={loading}
                  onClick={handleFinalSubmit}
                  className="w-full bg-[#0A1C10] text-[#3B8A58] py-4 rounded-xl font-black text-xs uppercase tracking-widest disabled:opacity-50 active:scale-95 transition-transform"
                >
                  {loading ? "Sending..." : "Submit Feedback"}
                </button>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div
                key="6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-10"
              >
                <div className="text-5xl mb-6">🙏</div>
                <h2 className="text-3xl font-black text-ink tracking-tighter uppercase mb-2">
                  Dhanyavad
                </h2>
                <p className="text-sm text-[#5A8060] font-medium leading-relaxed">
                  Your voice helps us build the discovery platform Odisha
                  deserves.
                </p>
                <button
                  onClick={resetForm}
                  className="mt-10 font-mono text-[10px] font-bold border border-[#D8D5C8] px-6 py-2 rounded-full hover:bg-white transition-colors"
                >
                  Submit Another
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* FOOTER */}
        <footer className="bg-[#0A1C10] p-4 text-center border-t border-[#1A3322]">
          <span className="font-black text-xs tracking-[0.3em] text-[#3B8A58] uppercase">
            Launching in Odisha
          </span>
        </footer>
      </div>
    </div>
  );
}
