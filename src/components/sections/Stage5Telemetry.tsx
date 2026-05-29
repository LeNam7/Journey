"use client";
import React from "react";
import { motion, MotionValue } from "framer-motion";

interface Stage5TelemetryProps {
  stagePercent: number;
  metricsOpacity: MotionValue<number> | number;
  metricsY: MotionValue<number> | number;
  onRestart: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function Stage5Telemetry({
  stagePercent,
  metricsOpacity,
  metricsY,
  onRestart,
  onMouseEnter,
  onMouseLeave
}: Stage5TelemetryProps) {
  return (
    <motion.div
      style={{
        opacity: metricsOpacity,
        y: metricsY,
        pointerEvents: stagePercent >= 92 ? "auto" : "none"
      }}
      className="absolute inset-0 flex flex-col justify-center items-center gap-12 z-15"
    >
      {/* Final counter grid columns */}
      <div className="w-full max-w-4xl space-y-4">
        <div className="text-center space-y-2">
          <span className="text-[8.5px] font-bold uppercase tracking-widest text-slate-400 font-mono">STAGE 5: DATA INTEGRATED // RETROSPECTIVE</span>
          <h3 className="font-sora text-2xl sm:text-3xl font-extrabold text-white">Capabilities Quantified Successfully</h3>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 space-y-1 shadow-xl">
            <span className="text-slate-400 text-[8px] font-mono font-bold uppercase tracking-wider block">Timeline Nodes</span>
            <div className="font-sora text-2xl sm:text-3xl font-bold text-white">05</div>
            <span className="text-[9px] text-slate-450 block font-semibold">Log Complete</span>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 space-y-1 shadow-xl">
            <span className="text-slate-400 text-[8px] font-mono font-bold uppercase tracking-wider block">Trajectory Active</span>
            <div className="font-sora text-2xl sm:text-3xl font-bold text-white">03</div>
            <span className="text-[9px] text-slate-450 block font-semibold">Modules Synced</span>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 space-y-1 shadow-xl">
            <span className="text-slate-400 text-[8px] font-mono font-bold uppercase tracking-wider block">Growth Actions</span>
            <div className="font-sora text-2xl sm:text-3xl font-bold text-white">12</div>
            <span className="text-[9px] text-slate-450 block font-semibold">Checks Verified</span>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 space-y-1 shadow-xl">
            <span className="text-slate-400 text-[8px] font-mono font-bold uppercase tracking-wider block">Horizon Matrix</span>
            <div className="font-sora text-2xl sm:text-3xl font-bold text-white">01</div>
            <span className="text-[9px] text-slate-450 block font-semibold">Primary Goal Clear</span>
          </div>
        </div>
      </div>

      {/* Launch CTA */}
      <div className="space-y-4 text-center">
        <h4 className="font-sora text-2xl sm:text-3xl font-bold tracking-tight text-white max-w-xl">
          Your Next Chapter Starts Now.
        </h4>
        <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed font-semibold">
          Permanent, mathematical motion. Continue coordinating, executing, documenting, and become the master architect of your coordinates.
        </p>

        <button
          onClick={onRestart}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="px-8 py-3.5 border border-white rounded-full font-bold text-xs uppercase tracking-widest bg-white hover:bg-transparent text-slate-950 hover:text-white transition-all duration-300 shadow-lg cursor-pointer inline-block"
        >
          Create My Journey Blueprint
        </button>
      </div>
    </motion.div>
  );
}
