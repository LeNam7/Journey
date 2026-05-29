"use client";
import React from "react";
import { motion, MotionValue } from "framer-motion";
import { PathDetail } from "@/types";

interface Stage3SlidesProps {
  paths: Record<string, PathDetail>;
  stagePercent: number;
  trajectoryOpacity: MotionValue<number> | number;
  slide1Opacity: MotionValue<number> | number;
  slide1Y: MotionValue<number> | number;
  slide2Opacity: MotionValue<number> | number;
  slide2Y: MotionValue<number> | number;
  slide3Opacity: MotionValue<number> | number;
  slide3Y: MotionValue<number> | number;
  bridgeWireProgress: MotionValue<number> | number;
}

export function Stage3Slides({
  paths,
  stagePercent,
  slide1Opacity,
  slide1Y,
  slide2Opacity,
  slide2Y,
  slide3Opacity,
  slide3Y,
  bridgeWireProgress
}: Stage3SlidesProps) {
  return (
    <>
      {/* --- SLIDE 3A: CREATOR PATH --- */}
      <motion.div
        style={{
          opacity: slide1Opacity,
          y: slide1Y,
          pointerEvents: (stagePercent >= 50 && stagePercent < 57) ? "auto" : "none"
        }}
        className="absolute inset-0 flex items-center justify-center z-15"
      >
        <div className="max-w-2xl w-full mx-auto px-8">
          <div className="rounded-2xl bg-slate-950/40 backdrop-blur-md border border-white/10 p-10 space-y-6 text-left shadow-2xl">
            <div className="space-y-2">
              <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400 font-mono">STAGE 3 · 01/03 // CREATOR ARCHETYPE</span>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-[8px] font-extrabold text-cyan-400 font-mono tracking-widest">
                CREATOR PATH
              </div>
            </div>
            <h2 className="font-sora text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {paths.creator.title}
            </h2>
            <p className="text-[9px] font-mono font-extrabold text-slate-400 uppercase tracking-wider">{paths.creator.tagline}</p>
            <p className="text-slate-300 text-sm font-semibold leading-relaxed">
              {paths.creator.description}
            </p>
            <div className="space-y-2 pt-2 border-t border-white/10">
              <h4 className="text-[7.5px] font-mono font-extrabold tracking-widest text-slate-400 uppercase">{paths.creator.actionTitle}</h4>
              {paths.creator.steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/10 border border-white/10">
                  <span className="h-5 w-5 rounded-full bg-cyan-500 text-white flex items-center justify-center text-[9px] font-bold font-mono shrink-0">0{idx+1}</span>
                  <span className="text-xs font-semibold text-slate-200">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* --- SLIDE 3B: FOUNDER PATH --- */}
      <motion.div
        style={{
          opacity: slide2Opacity,
          y: slide2Y,
          pointerEvents: (stagePercent >= 57 && stagePercent < 64) ? "auto" : "none"
        }}
        className="absolute inset-0 flex items-center justify-center z-15"
      >
        <div className="max-w-2xl w-full mx-auto px-8">
          <div className="rounded-2xl bg-slate-950/40 backdrop-blur-md border border-white/10 p-10 space-y-6 text-left shadow-2xl">
            <div className="space-y-2">
              <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400 font-mono">STAGE 3 · 02/03 // FOUNDER ARCHETYPE</span>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-400/30 bg-violet-400/10 text-[8px] font-extrabold text-violet-400 font-mono tracking-widest">
                FOUNDER PATH
              </div>
            </div>
            <h2 className="font-sora text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {paths.founder.title}
            </h2>
            <p className="text-[9px] font-mono font-extrabold text-slate-400 uppercase tracking-wider">{paths.founder.tagline}</p>
            <p className="text-slate-300 text-sm font-semibold leading-relaxed">
              {paths.founder.description}
            </p>
            <div className="space-y-2 pt-2 border-t border-white/10">
              <h4 className="text-[7.5px] font-mono font-extrabold tracking-widest text-slate-400 uppercase">{paths.founder.actionTitle}</h4>
              {paths.founder.steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/10 border border-white/10">
                  <span className="h-5 w-5 rounded-full bg-violet-500 text-white flex items-center justify-center text-[9px] font-bold font-mono shrink-0">0{idx+1}</span>
                  <span className="text-xs font-semibold text-slate-200">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* --- SLIDE 3C: EXPLORER PATH + BRIDGE WIRE --- */}
      <motion.div
        style={{
          opacity: slide3Opacity,
          y: slide3Y,
          pointerEvents: (stagePercent >= 64 && stagePercent < 72) ? "auto" : "none"
        }}
        className="absolute inset-0 flex items-center justify-center z-15"
      >
        <div className="max-w-2xl w-full mx-auto px-8">
          <div className="rounded-2xl bg-slate-950/40 backdrop-blur-md border border-white/10 p-10 space-y-6 text-left shadow-2xl">
            <div className="space-y-2">
              <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400 font-mono">STAGE 3 · 03/03 // EXPLORER ARCHETYPE</span>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-[8px] font-extrabold text-emerald-400 font-mono tracking-widest">
                EXPLORER PATH
              </div>
            </div>
            <h2 className="font-sora text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {paths.explorer.title}
            </h2>
            <p className="text-[9px] font-mono font-extrabold text-slate-400 uppercase tracking-wider">{paths.explorer.tagline}</p>
            <p className="text-slate-300 text-sm font-semibold leading-relaxed">
              {paths.explorer.description}
            </p>
            <div className="space-y-2 pt-2 border-t border-white/10">
              <h4 className="text-[7.5px] font-mono font-extrabold tracking-widest text-slate-400 uppercase">{paths.explorer.actionTitle}</h4>
              {paths.explorer.steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/10 border border-white/10">
                  <span className="h-5 w-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold font-mono shrink-0">0{idx+1}</span>
                  <span className="text-xs font-semibold text-slate-200">{step}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-slate-400 font-mono text-[8px] font-bold uppercase tracking-widest opacity-75">
              <span className="inline-block h-px w-8 bg-emerald-400 animate-pulse" />
              Connecting to Narrative pathway...
            </div>
          </div>
        </div>

        {/* ── HORIZONTAL BRIDGE WIRE ── */}
        <div className="absolute bottom-10 left-0 right-0 pointer-events-none overflow-hidden">
          <svg width="100%" height="60" viewBox="0 0 1200 60" preserveAspectRatio="none">
            <path d="M 1250 30 C 900 30, 600 30, 0 30" fill="none" stroke="rgba(100,100,120,0.12)" strokeWidth="2" />
            <motion.path
              d="M 1250 30 C 900 30, 600 30, 0 30"
              fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round"
              style={{ pathLength: bridgeWireProgress }}
            />
            <motion.circle cx="0" cy="30" r="5" fill="#34d399" style={{ opacity: bridgeWireProgress }} />
          </svg>
          <div className="absolute right-8 bottom-1">
            <span className="text-[7px] font-mono font-extrabold tracking-widest text-emerald-500 uppercase opacity-80">→ NARRATIVE</span>
          </div>
        </div>
      </motion.div>
    </>
  );
}
