"use client";
import React from "react";
import { motion, AnimatePresence, MotionValue } from "framer-motion";
import { Clock, CheckCircle2 } from "lucide-react";
import { Checkpoint, TaskCard } from "@/types";

interface Stage2TimelineMapProps {
  checkpoints: Checkpoint[];
  activeCheckpoint: number;
  stage2Progress: number;
  cardTilt: { x: number; y: number };
  timelineOpacity: MotionValue<number> | number;
  timelineY: MotionValue<number> | number;
  stagePercent: number;
  mapProgressLineHeight: MotionValue<string> | string;
  tasks: TaskCard[];
  toggleTaskStatus: (taskId: string, status: "todo" | "progress" | "done") => void;
  scrollToStagePercentage: (pct: number) => void;
  playClickTickSound: () => void;
  playCheckpointTone: (id: number) => void;
  setCursorHovering: (hover: boolean) => void;
}

export function Stage2TimelineMap({
  checkpoints,
  activeCheckpoint,
  stage2Progress,
  cardTilt,
  timelineOpacity,
  timelineY,
  stagePercent,
  mapProgressLineHeight,
  tasks,
  toggleTaskStatus,
  scrollToStagePercentage,
  playClickTickSound,
  playCheckpointTone,
  setCursorHovering
}: Stage2TimelineMapProps) {
  return (
    <motion.div
      style={{
        opacity: timelineOpacity,
        y: timelineY,
        pointerEvents: (stagePercent >= 20 && stagePercent < 50) ? "auto" : "none"
      }}
      className="absolute inset-0 flex flex-col justify-center z-15"
    >


      {/* All content constrained inside, canvas breaks free above */}
      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 flex flex-col gap-6">        {/* Stage 2 Cosmic tech header */}
        <div className="text-center space-y-1 sm:space-y-2 mt-4 select-none">
          <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400 font-mono">
            STAGE 2: CAPABILITY MATRIX // VERIFICATION PIPELINE
          </span>
          <h2 className="font-sora text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            Scroll-Driven Trajectory Validation
          </h2>
          <p className="text-slate-405 text-[10px] sm:text-xs font-semibold max-w-xl mx-auto">
            Scroll slowly to proceed. The background holographic 3D wireframe continuously morphs its geometric structure and interpolates color.
          </p>
        </div>

        {/* Premium Two-Column Layout sitting in front of the giant background canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* Column 1: Timeline checklist navigator (Left 5 columns) */}
          <div className="lg:col-span-5 rounded-2xl bg-slate-950/40 backdrop-blur-md p-5 relative border border-white/10 shadow-xl h-[360px] flex flex-col justify-center overflow-hidden">
            {/* Wavy Timeline Connector Wire */}
            <svg 
              viewBox="0 0 48 280" 
              preserveAspectRatio="none" 
              className="absolute left-[15px] sm:left-[25px] top-12 bottom-12 w-[48px] h-[calc(100%-96px)] pointer-events-none z-0 overflow-visible"
            >
              <defs>
                <mask id="wavy-scroll-mask">
                  <motion.path 
                    d="M 24,0 C 8,17.5 8,52.5 24,70 C 40,87.5 40,122.5 24,140 C 8,157.5 8,192.5 24,210 C 40,227.5 40,262.5 24,280"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="8"
                    strokeLinecap="round"
                    pathLength={stage2Progress}
                  />
                </mask>
              </defs>

              {/* Background winding cord (completely black / extremely dark initially) */}
              <path 
                d="M 24,0 C 8,17.5 8,52.5 24,70 C 40,87.5 40,122.5 24,140 C 8,157.5 8,192.5 24,210 C 40,227.5 40,262.5 24,280"
                fill="none" 
                className="stroke-slate-950/80 stroke-[2px] stroke-linecap-round" 
              />
              
              {/* Active glowing background track (white base under the energy laser) */}
              <path 
                d="M 24,0 C 8,17.5 8,52.5 24,70 C 40,87.5 40,122.5 24,140 C 8,157.5 8,192.5 24,210 C 40,227.5 40,262.5 24,280"
                fill="none"
                className="stroke-white/20 stroke-[2px] stroke-linecap-round"
                mask="url(#wavy-scroll-mask)"
              />

              {/* Active glowing energy pulse (dashes flowing down the scroll-revealed path) */}
              <path 
                d="M 24,0 C 8,17.5 8,52.5 24,70 C 40,87.5 40,122.5 24,140 C 8,157.5 8,192.5 24,210 C 40,227.5 40,262.5 24,280"
                fill="none"
                className="stroke-white stroke-[2.5px] stroke-linecap-round animate-energy-flow"
                mask="url(#wavy-scroll-mask)"
                style={{
                  strokeDasharray: "15, 20",
                  filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.95))"
                }}
              />
              
              {/* Cyber cyan outer core glow for supreme space-tech look */}
              <path 
                d="M 24,0 C 8,17.5 8,52.5 24,70 C 40,87.5 40,122.5 24,140 C 8,157.5 8,192.5 24,210 C 40,227.5 40,262.5 24,280"
                fill="none"
                className="stroke-cyan-400/50 stroke-[4px] stroke-linecap-round"
                mask="url(#wavy-scroll-mask)"
                style={{
                  filter: "blur(2px)"
                }}
              />
            </svg>

            <div className="space-y-4 z-10 relative">
              {checkpoints.map((cp) => {
                const isActive = cp.id === activeCheckpoint;
                const isCompleted = cp.id < activeCheckpoint;

                return (
                  <div
                    key={cp.id}
                    onClick={() => {
                      playClickTickSound();
                      playCheckpointTone(cp.id);
                      const targetPct = cp.id === 1 ? 0.20 : cp.id === 2 ? 0.25 : cp.id === 3 ? 0.30 : cp.id === 4 ? 0.35 : 0.41;
                      scrollToStagePercentage(targetPct);
                    }}
                    onMouseEnter={() => setCursorHovering(true)}
                    onMouseLeave={() => setCursorHovering(false)}
                    className={`group flex items-center gap-4 p-2.5 rounded-xl cursor-pointer transition-all duration-300 border ${
                      isActive
                        ? "bg-white/10 border-white/20 shadow-md scale-[1.02]"
                        : "hover:bg-white/5 border-transparent"
                    }`}
                  >
                    {/* Node Circle */}
                    <div className="relative shrink-0 z-10">
                      {isActive && (
                        <div className="absolute inset-[-4px] rounded-full border border-white/20 animate-pulse pointer-events-none" />
                      )}
                      <div
                        className={`h-8 w-8 rounded-full border flex items-center justify-center transition-all text-xs relative overflow-hidden ${
                          isCompleted
                            ? "bg-emerald-500/80 border-emerald-500/80 text-white shadow-md"
                            : isActive
                            ? "bg-white border-white text-slate-950 shadow-md font-bold"
                            : "bg-white/5 border-white/10 text-slate-400"
                        }`}
                      >
                        {/* Number always shown */}
                        <span className={`font-bold transition-opacity duration-200 ${isCompleted ? "opacity-0" : "opacity-100"}`}>
                          0{cp.id}
                        </span>
                        {/* Animated tick appears when completed */}
                        <AnimatePresence>
                          {isCompleted && (
                            <motion.span
                              key={`tick-${cp.id}`}
                              initial={{ scale: 0, opacity: 0, rotate: -45 }}
                              animate={{ scale: 1, opacity: 1, rotate: 0 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 28, delay: 0.05 }}
                              className="absolute inset-0 flex items-center justify-center"
                            >
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <motion.path
                                  d="M 2 7 L 5.5 10.5 L 12 3.5"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
                                />
                              </svg>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="flex-1 text-left min-w-0">
                      <h3 className={`font-sora font-bold text-xs truncate transition-colors ${
                        isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                      }`}>
                        {cp.title}
                      </h3>
                      <span className="text-[8px] font-mono font-bold text-slate-500 block uppercase tracking-wider mt-0.5">
                        {isCompleted ? "VERIFIED" : isActive ? "IN PROBE" : "LOCKED"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Checkpoint Detail Checklist Card (Right 7 columns) */}
          <div className="lg:col-span-7 h-[360px] text-left relative flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {checkpoints.map((cp) => {
                if (cp.id !== activeCheckpoint) return null;

                return (
                  <motion.div
                    key={cp.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl bg-slate-955/45 backdrop-blur-md border border-white/10 p-5 space-y-4 shadow-xl relative overflow-hidden flex flex-col justify-between h-full"
                  >
                    <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none z-0" />

                    <div className="space-y-3 z-10 relative">
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-white shrink-0">
                          {cp.icon}
                        </div>
                        <div>
                          <div className="text-[7px] uppercase font-extrabold tracking-widest text-slate-400 font-mono">SELECTED BLUEPRINT // QUANTUM MATRIX</div>
                          <h3 className="font-sora text-sm font-extrabold text-white leading-tight">{cp.title}</h3>
                        </div>
                      </div>

                      <p className="text-[10px] sm:text-xs text-slate-305 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-white/5 font-semibold">
                        {cp.description}
                      </p>
                    </div>

                    {/* Action checklists */}
                    <div className="space-y-2.5 z-10 relative overflow-y-auto max-h-[140px] pr-1">
                      <h4 className="text-[7.5px] font-mono font-extrabold tracking-widest text-slate-400 uppercase">Verification tasks</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {cp.tasks.map((task, idx) => {
                          const associatedTask = tasks.find(t => t.title.includes(task));
                          const isDone = associatedTask?.status === "done";

                          return (
                            <div
                              key={idx}
                              onClick={() => {
                                playClickTickSound();
                                if (associatedTask) {
                                  toggleTaskStatus(associatedTask.id, isDone ? "todo" : "done");
                                }
                              }}
                              onMouseEnter={() => setCursorHovering(true)}
                              onMouseLeave={() => setCursorHovering(false)}
                              className={`flex items-start gap-2 p-2 rounded-lg border transition-all cursor-pointer ${
                                isDone
                                  ? "bg-white/5 border-white/5 text-slate-400"
                                  : "bg-white/10 border-white/10 text-slate-200 hover:border-white/30 hover:bg-white/20"
                              }`}
                            >
                              <div className={`h-4 w-4 shrink-0 rounded border flex items-center justify-center mt-0.5 transition-colors ${
                                isDone
                                  ? "bg-emerald-500 border-emerald-500 text-white"
                                  : "border-white/20 bg-transparent text-transparent"
                              }`}>
                                <CheckCircle2 className="h-2.5 w-2.5 text-white" />
                              </div>
                              <div className="text-[9.5px] font-bold leading-normal flex-1">
                                <span className={`${isDone ? "line-through" : ""}`}>{task}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Footer Advances */}
                    <div className="pt-2.5 border-t border-white/10 flex items-center justify-between z-10 relative text-[10px] font-bold">
                      <div className="flex items-center gap-1 text-slate-400">
                        <Clock className="h-3 w-3" />
                        <span>Telemetry:</span>
                        <span className="text-white font-mono">+{cp.xpReward} XP</span>
                      </div>
                      <span className="text-[8.5px] font-mono text-slate-500 uppercase">
                        [{cp.status.toUpperCase()}]
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>{/* end content wrapper */}
    </motion.div>
  );
}
