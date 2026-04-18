"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import { createClient } from "@/utils/supabase/client";

const COLORS = {
  bg: "#FDFCF9", // Softer luxury cream
  ink: "#0A1C10",
  greenAcc: "#2D5A3F", // Deeper, more "forest" premium green
  border: "#E5E2D9",
  accent: "#C19A6B", // Gold/Wood accent for a touch of class
};

const ODISHA_PATH =
  "M 260 30 L 295 45 L 320 70 L 330 100 L 325 130 L 310 155 L 295 175 L 270 190 L 240 200 L 210 210 L 185 215 L 160 210 L 140 195 L 120 180 L 100 165 L 80 155 L 60 160 L 45 175 L 40 190 L 50 210 L 65 225 L 85 230 L 100 220 L 110 230 L 120 245 L 140 255 L 165 258 L 185 255 L 200 262 L 210 255 L 220 245 L 230 250 L 245 258 L 265 255 L 280 240 L 290 225 L 295 210 L 290 195 L 280 185 L 285 170 L 300 160 L 315 145 L 325 125 L 330 100 L 320 70 L 295 45 L 260 30";

// Variants for staggered entry
const containerVars = {
  animate: { transition: { staggerChildren: 0.05 } },
};

const itemVars = {
  initial: { opacity: 0, y: 15 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  exit: { opacity: 0, y: -10 },
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
      toast.error("Share a few more details...");
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
      toast.success("Submissions Saved", {
        style: {
          borderRadius: "0px",
          background: COLORS.ink,
          color: "#fff",
          fontSize: "12px",
          letterSpacing: "0.1em",
        },
      });
      setStep(5);
      setTimeout(resetForm, 4000);
    } catch (error) {
      console.error(error.message);
      toast.error("Connection Interrupted");
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
    <div
      className="fixed inset-0 flex items-center justify-center overflow-hidden font-sans"
      style={{ backgroundColor: COLORS.bg }}
    >
      <Toaster position="bottom-right" />

      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-50 bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />

      {/* FULL SCREEN MOBILE CARD */}
      <div className="relative w-full h-full md:max-w-105 md:h-[85vh] md:rounded-[3rem] bg-white md:border border-[#D8D5C8] md:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col">
        {/* ARTISTIC WATERMARK */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
          <svg
            viewBox="0 0 380 270"
            className="w-[150%] h-auto -rotate-12 scale-150"
          >
            <path
              d={ODISHA_PATH}
              fill="none"
              stroke={COLORS.ink}
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* HEADER */}
        <header className="relative z-10 p-10 pb-6 flex justify-between items-end">
          <div>
            <p className="text-xl font-bold tracking-[0.3em] text-[#A0A090] uppercase ">
              Tripzort
            </p>
            <h1 className="text-lg font-black italic uppercase tracking-tighter text-[#0A1C10]">
              Feedback Portal
            </h1>
          </div>
          <div className="flex gap-1 mb-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  width: step === i ? 24 : 6,
                  backgroundColor: step >= i ? COLORS.greenAcc : "#E5E2D9",
                }}
                className="h-1 rounded-full transition-all duration-500"
              />
            ))}
          </div>
        </header>

        {/* CONTENT AREA */}
        <main className="relative z-10 flex-1 px-10 overflow-y-auto pb-10 hide-scrollbar">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="1"
                variants={containerVars}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <motion.h2
                  variants={itemVars}
                  className="text-4xl font-black text-[#0A1C10] leading-[0.9] tracking-tight uppercase italic"
                >
                  Identity<span className="text-[#3B8A58]">.</span>
                </motion.h2>
                <div className="space-y-3">
                  {[
                    "Friend of Kaushal",
                    "Friend of Friend",
                    "Content Creator / Traveler",
                    "From Instagram",
                    "From Reddit",
                    "Someone shared this link",
                    "Just exploring",
                  ].map((opt) => (
                    <motion.button
                      key={opt}
                      variants={itemVars}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setForm({ ...form, source: opt });
                        next();
                      }}
                      className="w-full text-left p-5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-[#3B8A58] transition-all font-bold text-[#0A1C10] text-sm"
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="2"
                variants={containerVars}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <motion.h2
                  variants={itemVars}
                  className="text-4xl font-black text-[#0A1C10] leading-[0.9] tracking-tight uppercase italic"
                >
                  Platform<span className="text-[#3B8A58]">.</span>
                </motion.h2>
                <div className="grid grid-cols-1 gap-2 mb-4">
                  {[
                    "WhatsApp",
                    "Instagram",
                    "Reddit",
                    "LinkedIn",
                    "Email",
                    "In Person",
                    "Other",
                  ].map((opt) => (
                    <motion.button
                      key={opt}
                      variants={itemVars}
                      whileHover={{ x: 5 }}
                      onClick={() => {
                        setForm({ ...form, platform: opt });
                        next();
                      }}
                      className="w-full text-left p-5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-[#3B8A58] transition-all font-bold text-[#0A1C10] text-sm"
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="3"
                variants={containerVars}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <motion.h2
                  variants={itemVars}
                  className="text-4xl font-black text-[#0A1C10] leading-[0.9] tracking-tight uppercase italic"
                >
                  Segment<span className="text-[#3B8A58]">.</span>
                </motion.h2>
                <div className="space-y-3">
                  {[
                    "Opening the app",
                    "Peeks (hotel/place videos)",
                    "Searching for hotels",
                    "Booking a hotel",
                    "Hotel or place details",
                    "Payment",
                    "App speed/ performance/ design",
                    "Food & place discovery",
                  ].map((opt) => (
                    <motion.button
                      key={opt}
                      variants={itemVars}
                      whileHover={{ x: 5 }}
                      onClick={() => {
                        setForm({ ...form, area: opt });
                        next();
                      }}
                      className="w-full text-left p-5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-[#3B8A58] transition-all font-bold text-[#0A1C10] text-sm"
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="4"
                variants={containerVars}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <motion.h2
                  variants={itemVars}
                  className="text-4xl font-black text-[#0A1C10] leading-[0.9] tracking-tight uppercase italic"
                >
                  Insights<span className="text-[#3B8A58]">.</span>
                </motion.h2>
                <div className="grid grid-cols-1 gap-2 mb-4">
                  {[
                    "App Crashed",
                    "Too many steps",
                    "Broken links",
                    "Bad colors",
                  ].map((opt) => (
                    <motion.button
                      key={opt}
                      variants={itemVars}
                      onClick={() => toggleProblem(opt)}
                      className={`w-full text-left p-5 rounded-xl border transition-all font-bold text-sm ${form.problemTypes.includes(opt) ? "bg-[#0A1C10] text-white" : "bg-gray-50/50 border-gray-100"}`}
                    >
                      <div className="flex justify-between items-center">
                        {opt}
                        {form.problemTypes.includes(opt) && (
                          <motion.span layoutId="check">●</motion.span>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
                <motion.button
                  variants={itemVars}
                  onClick={next}
                  className="w-full py-5 bg-[#3B8A58] text-white rounded-xl font-black text-[10px] uppercase tracking-[0.3em] shadow-lg shadow-[#3B8A58]/20"
                >
                  Confirm Selections
                </motion.button>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-4xl font-black text-[#0A1C10] leading-[0.9] tracking-tight uppercase italic">
                  Notes<span className="text-[#3B8A58]">.</span>
                </h2>
                <textarea
                  onChange={(e) => setForm({ ...form, raw: e.target.value })}
                  className="w-full h-48 bg-gray-50/80 border-none rounded-2xl p-6 outline-none focus:ring-2 ring-[#3B8A58]/20 transition-all text-sm font-medium"
                  placeholder="The floor is yours. Hindi, English, or Odia..."
                />
                <button
                  disabled={loading}
                  onClick={handleFinalSubmit}
                  className="w-full py-5 bg-[#0A1C10] text-white rounded-xl font-black text-[10px] uppercase tracking-[0.3em] disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Send Feedback"}
                </button>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div
                key="6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center"
              >
                <div className="relative mb-8">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-24 h-24 bg-[#F5F2E8] rounded-full flex items-center justify-center text-4xl"
                  >
                    🙏
                  </motion.div>
                </div>
                <h2 className="text-5xl font-black text-[#0A1C10] tracking-tighter italic">
                  DHANYAVAD
                </h2>
                <p className="text-[10px] font-bold text-gray-400 mt-4 tracking-[0.2em] uppercase">
                  Your voice matters to Tripzort
                </p>

                <div className="mt-12 h-0.5 w-32 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#3B8A58]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* FOOTER */}
        <footer className="relative z-10 p-10 pt-0">
          <div className="flex items-center gap-4 opacity-20">
            <div className="h-px flex-1 bg-[#0A1C10]" />
            <span className="text-[8px] font-black uppercase tracking-[0.5em]">
              Odisha
            </span>
            <div className="h-px flex-1 bg-[#0A1C10]" />
          </div>
        </footer>
      </div>
    </div>
  );
}
