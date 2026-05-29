"use client";
import React from "react";
import { motion, MotionValue } from "framer-motion";
import { ArrowRight, Play, Clock, CheckCircle2 } from "lucide-react";
import { TaskCard } from "@/types";

interface Stage1ConceptionProps {
  heroOpacity: MotionValue<number> | number;
  heroY: MotionValue<number> | number;
  stagePercent: number;
  boardScale: MotionValue<number> | number;
  boardX: MotionValue<string> | string;
  boardY: MotionValue<number> | number;
  boardOpacity: MotionValue<number> | number;
  boardRotateX: MotionValue<number> | number;
  boardRotateY: MotionValue<number> | number;
  boardRotateZ: MotionValue<number> | number;
  cardTilt: { x: number; y: number };
  tasks: TaskCard[];
  scrollToStagePercentage: (pct: number) => void;
  playClickTickSound: () => void;
  toggleAmbientAudio: () => void;
  setCursorHovering: (hover: boolean) => void;
}

export function Stage1Conception({
  heroOpacity,
  heroY,
  stagePercent,
  boardScale,
  boardX,
  boardY,
  boardOpacity,
  boardRotateX,
  boardRotateY,
  boardRotateZ,
  cardTilt,
  tasks,
  scrollToStagePercentage,
  playClickTickSound,
  toggleAmbientAudio,
  setCursorHovering
}: Stage1ConceptionProps) {
  return (
    <div style={{ perspective: "1400px", transformStyle: "preserve-3d" }} className="absolute inset-0 w-full h-full pointer-events-none z-20 flex items-center justify-center">
      {/* ------------------------------------------
          STAGE 1: DISSOLVING KANBAN & HERO TITLE
          ------------------------------------------ */}
      <motion.div
        style={{
          opacity: heroOpacity,
          y: heroY,
          pointerEvents: stagePercent < 18 ? "auto" : "none",
          transformStyle: "preserve-3d"
        }}
        className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left z-20"
      >
        <div className="lg:col-span-6 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold text-slate-200 tracking-wider">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-dot" />
            <span className="font-mono text-[9px]">STAGE 1: CONCEPTION // ACTIVATE</span>
          </div>

          <h1 className="font-sora text-4xl sm:text-[3.3rem] font-bold tracking-tight text-white leading-[1.08]">
            CHART THE COMMAND CENTER OF YOUR{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
              EVOLUTION.
            </span>
          </h1>

          <p className="text-slate-350 text-sm sm:text-base font-semibold leading-relaxed max-w-xl">
            Move beyond simple, static to-do lists. Map out your custom learning roadmap, tackle key trials, coordinate steps in real-time, and celebrate breakthroughs.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                playClickTickSound();
                scrollToStagePercentage(0.30);
              }}
              onMouseEnter={() => setCursorHovering(true)}
              onMouseLeave={() => setCursorHovering(false)}
              className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-widest shadow-lg transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>Start the Journey</span>
              <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => {
                playClickTickSound();
                toggleAmbientAudio();
                scrollToStagePercentage(0.80);
              }}
              onMouseEnter={() => setCursorHovering(true)}
              onMouseLeave={() => setCursorHovering(false)}
              className="px-6 py-3.5 rounded-full border border-white/20 hover:border-white bg-white/5 hover:bg-white/15 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer"
            >
              <div className="h-5 w-5 rounded-full border border-white/10 flex items-center justify-center text-slate-400">
                <Play className="h-2 w-2 fill-slate-400 translate-x-[1px]" />
              </div>
              <span>How It Works</span>
            </button>
          </div>

          {/* Scroll hints indicator */}
          <div className="pt-8 flex items-center gap-2 select-none opacity-40 font-mono text-[9px] font-bold text-slate-400">
            <Clock className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: "6s" }} />
            <span>SCROLL DOWN TO DISSOLVE TASKS INTO ABSTRACT BLUEPRINT TIMELINE MAP</span>
          </div>

        </div>
      </motion.div>

      {/* 3D TILTED KANBAN BOARD MOCKUP (UNIFIED FLOATING OBJECT MORPHING IN PERSPECTIVE) */}
      <motion.div
        style={{
          scale: boardScale,
          x: boardX,
          y: boardY,
          opacity: boardOpacity,
          rotateX: stagePercent < 15 ? cardTilt.y : boardRotateX,
          rotateY: stagePercent < 15 ? cardTilt.x : boardRotateY,
          rotateZ: boardRotateZ,
          pointerEvents: stagePercent < 22 ? "auto" : "none",
          transformStyle: "preserve-3d"
        }}
        className="absolute right-0 lg:right-6 w-[450px] rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md p-4 shadow-[0_35px_80px_-20px_rgba(0,0,0,0.9)] z-25 flex flex-col pointer-events-none select-none"
      >
        {/* --- 3D Glass Slab Thickness Extrusion Layers --- */}
        {/* Mid-pane wireframe layer (extrudes -6px deep) */}
        <div style={{ transform: "translateZ(-6px)" }} className="absolute inset-0 rounded-2xl border border-white/10 bg-white/[0.01] pointer-events-none" />
        
        {/* Back-pane wireframe layer (extrudes -12px deep with drop shadow backing) */}
        <div style={{ transform: "translateZ(-12px)" }} className="absolute inset-0 rounded-2xl border border-white/20 bg-slate-950/20 backdrop-blur-sm pointer-events-none" />
        
        {/* Mockup browser frame (layered float) */}
        <div style={{ transform: "translateZ(30px)" }} className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <div className="w-48 h-4 rounded bg-white/5 flex items-center justify-center">
            <span className="text-[8px] font-mono text-slate-400 truncate">journey.tidy.io/evolution</span>
          </div>
          <div className="w-3" />
        </div>

        {/* Kanban Columns (layered float) */}
        <div style={{ transformStyle: "preserve-3d" }} className="space-y-4">
          <div style={{ transform: "translateZ(40px)" }} className="flex items-center justify-between">
            <div>
              <h3 className="font-sora text-xs font-extrabold text-white">Growth Dashboard</h3>
              <p className="text-[9px] text-slate-450 font-bold uppercase tracking-wider font-mono">STAGE CYCLES // TELEMETRY</p>
            </div>
            <div className="flex -space-x-1">
              <div className="h-5 w-5 rounded-full bg-cyan-600 border border-slate-950 flex items-center justify-center text-[7px] font-bold text-white">AR</div>
              <div className="h-5 w-5 rounded-full bg-fuchsia-600 border border-slate-950 flex items-center justify-center text-[7px] font-bold text-white">NM</div>
            </div>
          </div>

          <div style={{ transformStyle: "preserve-3d" }} className="grid grid-cols-3 gap-2">
            {/* TO DO COLUMN */}
            <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }} className="space-y-2 bg-white/5 rounded-xl p-2 border border-white/5">
              <span className="text-[7.5px] font-extrabold text-slate-450 tracking-wider uppercase font-mono block mb-1">TO DO</span>
              {tasks.filter(t => t.status === "todo").map(task => (
                <div key={task.id} style={{ transform: "translateZ(10px)" }} className="bg-slate-900/60 rounded-lg p-1.5 border border-white/10 shadow-sm space-y-1 text-slate-200">
                  <p className="text-[8.5px] font-bold leading-tight truncate">{task.title.split(": ")[1] || task.title}</p>
                  <span className="text-[6.5px] font-mono font-bold bg-pink-500/10 border border-pink-500/20 text-pink-400 px-1 rounded-full">{task.category}</span>
                </div>
              ))}
            </div>

            {/* DOING COLUMN (Hovering highest for active work focus) */}
            <div style={{ transform: "translateZ(70px)", transformStyle: "preserve-3d" }} className="space-y-2 bg-amber-500/5 rounded-xl p-2 border border-amber-500/25 relative shadow-inner">
              <span className="text-[7.5px] font-extrabold text-amber-400 tracking-wider uppercase font-mono block mb-1">DOING</span>
              {tasks.filter(t => t.status === "progress").map(task => (
                <div key={task.id} style={{ transform: "translateZ(15px)" }} className="bg-slate-900/80 rounded-lg p-1.5 border border-amber-500/20 shadow-md space-y-1.5 text-slate-200 relative z-10">
                  <p className="text-[8.5px] font-bold leading-tight">{task.title.split(": ")[1] || task.title}</p>
                  <div className="w-full bg-slate-800 h-0.8 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full animate-pulse" style={{ width: `${task.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* DONE COLUMN */}
            <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }} className="space-y-2 bg-white/5 rounded-xl p-2 border border-white/5">
              <span className="text-[7.5px] font-extrabold text-slate-450 tracking-wider uppercase font-mono block mb-1">DONE</span>
              {tasks.filter(t => t.status === "done").map(task => (
                <div key={task.id} style={{ transform: "translateZ(10px)" }} className="bg-slate-900/40 rounded-lg p-1.5 border border-white/5 shadow-sm space-y-1 opacity-60 text-slate-400">
                  <p className="text-[8.5px] font-bold leading-tight line-through truncate">{task.title.split(": ")[1] || task.title}</p>
                  <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400 block" />
                </div>
              ))}
            </div>
          </div>

          {/* Sub-header details */}
          <div style={{ transform: "translateZ(25px)" }} className="pt-2 border-t border-white/10 flex items-center justify-between text-[7px] text-slate-500 font-bold font-mono">
            <span>COORD VERIFIED MAPPING ACTIVE</span>
            <span>v2.0 MASTER</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
