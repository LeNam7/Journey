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
    <>
      {/* ------------------------------------------
          STAGE 1: DISSOLVING KANBAN & HERO TITLE
          ------------------------------------------ */}
      <motion.div
        style={{
          opacity: heroOpacity,
          y: heroY,
          pointerEvents: stagePercent < 18 ? "auto" : "none"
        }}
        className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left z-20"
      >
        <div className="lg:col-span-6 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white/60 text-xs font-bold text-slate-800 tracking-wider">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-dot" />
            <span className="font-mono text-[9px]">STAGE 1: CONCEPTION // ACTIVATE</span>
          </div>

          <h1 className="font-sora text-4xl sm:text-[3.3rem] font-bold tracking-tight text-slate-950 leading-[1.08]">
            CHART THE COMMAND CENTER OF YOUR{" "}
            <span className="bg-gradient-to-r from-cyan-600 via-violet-600 to-pink-500 bg-clip-text text-transparent">
              EVOLUTION.
            </span>
          </h1>

          <p className="text-slate-650 text-sm sm:text-base font-semibold leading-relaxed max-w-xl">
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
              className="px-6 py-3.5 rounded-full bg-slate-955 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest shadow-md transition-all flex items-center gap-2 group cursor-pointer"
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
              className="px-6 py-3.5 rounded-full border border-slate-350 hover:border-slate-800 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-950 font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer"
            >
              <div className="h-5 w-5 rounded-full border border-slate-200 flex items-center justify-center text-slate-500">
                <Play className="h-2 w-2 fill-slate-500 translate-x-[1px]" />
              </div>
              <span>How It Works</span>
            </button>
          </div>

          {/* Scroll hints indicator */}
          <div className="pt-8 flex items-center gap-2 select-none opacity-40 font-mono text-[9px] font-bold">
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
          pointerEvents: stagePercent < 22 ? "auto" : "none"
        }}
        className="absolute right-0 lg:right-6 w-[450px] rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-xl z-25 flex flex-col pointer-events-none select-none"
      >
        {/* Mockup browser frame */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div className="w-48 h-4 rounded bg-slate-100/80 flex items-center justify-center">
            <span className="text-[8px] font-mono text-slate-400 truncate">journey.tidy.io/evolution</span>
          </div>
          <div className="w-3" />
        </div>

        {/* Kanban Columns */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-sora text-xs font-extrabold text-slate-905">Growth Dashboard</h3>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono">STAGE CYCLES // TELEMETRY</p>
            </div>
            <div className="flex -space-x-1">
              <div className="h-5 w-5 rounded-full bg-cyan-600 border border-white flex items-center justify-center text-[7px] font-bold text-white">AR</div>
              <div className="h-5 w-5 rounded-full bg-fuchsia-600 border border-white flex items-center justify-center text-[7px] font-bold text-white">NM</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* TO DO COLUMN */}
            <div className="space-y-2 bg-slate-50/80 rounded-xl p-2 border border-slate-100">
              <span className="text-[7.5px] font-extrabold text-slate-400 tracking-wider uppercase font-mono block mb-1">TO DO</span>
              {tasks.filter(t => t.status === "todo").map(task => (
                <div key={task.id} className="bg-white rounded-lg p-1.5 border border-slate-150 shadow-sm space-y-1">
                  <p className="text-[8.5px] font-bold text-slate-800 leading-tight truncate">{task.title.split(": ")[1] || task.title}</p>
                  <span className="text-[6.5px] font-mono font-bold bg-pink-50 border border-pink-100 text-pink-500 px-1 rounded-full">{task.category}</span>
                </div>
              ))}
            </div>

            {/* DOING COLUMN */}
            <div className="space-y-2 bg-slate-50/80 rounded-xl p-2 border border-slate-100">
              <span className="text-[7.5px] font-extrabold text-slate-400 tracking-wider uppercase font-mono block mb-1">DOING</span>
              {tasks.filter(t => t.status === "progress").map(task => (
                <div key={task.id} className="bg-white rounded-lg p-1.5 border border-slate-150 shadow-sm space-y-1.5">
                  <p className="text-[8.5px] font-bold text-slate-850 leading-tight">{task.title.split(": ")[1] || task.title}</p>
                  <div className="w-full bg-slate-100 h-0.8 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: `${task.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* DONE COLUMN */}
            <div className="space-y-2 bg-slate-50/80 rounded-xl p-2 border border-slate-100">
              <span className="text-[7.5px] font-extrabold text-slate-400 tracking-wider uppercase font-mono block mb-1">DONE</span>
              {tasks.filter(t => t.status === "done").map(task => (
                <div key={task.id} className="bg-white rounded-lg p-1.5 border border-slate-150 shadow-sm space-y-1 opacity-80">
                  <p className="text-[8.5px] font-bold text-slate-400 leading-tight line-through truncate">{task.title.split(": ")[1] || task.title}</p>
                  <CheckCircle2 className="h-2.5 w-2.5 text-emerald-500 block" />
                </div>
              ))}
            </div>
          </div>

          {/* Sub-header details */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[7px] text-slate-450 font-bold font-mono">
            <span>COORD VERIFIED MAPPING ACTIVE</span>
            <span>v2.0 MASTER</span>
          </div>
        </div>
      </motion.div>
    </>
  );
}
