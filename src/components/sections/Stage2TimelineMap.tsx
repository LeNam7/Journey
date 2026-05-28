"use client";
import React from "react";
import { motion, AnimatePresence, MotionValue } from "framer-motion";
import { Clock, CheckCircle2 } from "lucide-react";
import { Checkpoint, TaskCard } from "@/types";
import { Abstract3DCanvas } from "@/components/canvas/Abstract3DCanvas";

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
      {/* Full-screen interactive 3D morphing background canvas — truly full viewport */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <div className="w-full h-full opacity-[0.35] md:opacity-[0.45]">
          <Abstract3DCanvas progress={stage2Progress} tilt={cardTilt} />
        </div>
      </div>

      {/* All content constrained inside, canvas breaks free above */}
      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 flex flex-col gap-6">

        {/* Stage 2 Cosmic tech header */}
        <div className="text-center space-y-1 sm:space-y-2 mt-4 select-none">
          <span className="text-[8px] font-bold uppercase tracking-widest text-slate-500 font-mono">
            STAGE 2: CAPABILITY MATRIX // VERIFICATION PIPELINE
          </span>
          <h2 className="font-sora text-xl sm:text-2xl font-extrabold tracking-tight text-slate-905">
            Scroll-Driven Trajectory Validation
          </h2>
          <p className="text-slate-500 text-[10px] sm:text-xs font-semibold max-w-xl mx-auto">
            Scroll slowly to proceed. The background holographic 3D wireframe continuously morphs its geometric structure and interpolates color.
          </p>
        </div>

        {/* Premium Two-Column Layout sitting in front of the giant background canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* Column 1: Timeline checklist navigator (Left 5 columns) */}
          <div className="lg:col-span-5 rounded-2xl bg-white/15 backdrop-blur-sm p-5 relative border border-white/30 shadow-sm h-[360px] flex flex-col justify-center overflow-hidden">
            <div className="absolute left-[39px] sm:left-[49px] top-10 bottom-10 w-[1px] bg-slate-200 z-0" />
            
            <motion.div 
              style={{ height: mapProgressLineHeight }}
              className="absolute left-[39px] sm:left-[49px] top-10 w-[1.5px] bg-slate-950 z-10 origin-top shadow-[0_0_8px_rgba(15,23,42,0.15)]"
            />

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
                        ? "bg-white border-slate-250 shadow-sm scale-[1.02]"
                        : "hover:bg-white/40 border-transparent"
                    }`}
                  >
                    {/* Node Circle */}
                    <div className="relative shrink-0 z-10">
                      {isActive && (
                        <div className="absolute inset-[-4px] rounded-full border border-slate-900/10 animate-pulse pointer-events-none" />
                      )}
                      <div
                        className={`h-8 w-8 rounded-full border flex items-center justify-center transition-all text-xs relative overflow-hidden ${
                          isCompleted
                            ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                            : isActive
                            ? "bg-white border-slate-900 text-slate-900 shadow-sm font-bold"
                            : "bg-slate-100 border-slate-200 text-slate-450"
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
                        isActive ? "text-slate-950" : "text-slate-550 group-hover:text-slate-900"
                      }`}>
                        {cp.title}
                      </h3>
                      <span className="text-[8px] font-mono font-bold text-slate-400 block uppercase tracking-wider mt-0.5">
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
                    className="rounded-2xl bg-white/15 backdrop-blur-sm border border-white/30 p-5 space-y-4 shadow-sm relative overflow-hidden flex flex-col justify-between h-full"
                  >
                    <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none z-0" />

                    <div className="space-y-3 z-10 relative">
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-lg bg-slate-900 flex items-center justify-center text-white shrink-0">
                          {cp.icon}
                        </div>
                        <div>
                          <div className="text-[7px] uppercase font-extrabold tracking-widest text-slate-450 font-mono">SELECTED BLUEPRINT // QUANTUM MATRIX</div>
                          <h3 className="font-sora text-sm font-extrabold text-slate-950 leading-tight">{cp.title}</h3>
                        </div>
                      </div>

                      <p className="text-[10px] sm:text-xs text-slate-655 leading-relaxed bg-[#f8f9fb]/90 p-3.5 rounded-xl border border-slate-100 font-semibold">
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
                                  ? "bg-slate-50 border-slate-200 text-slate-400"
                                  : "bg-white/90 border-slate-200 text-slate-700 hover:border-slate-350 hover:bg-white"
                              }`}
                            >
                              <div className={`h-4 w-4 shrink-0 rounded border flex items-center justify-center mt-0.5 transition-colors ${
                                isDone
                                  ? "bg-slate-900 border-slate-900 text-white"
                                  : "border-slate-200 bg-white text-transparent"
                              }`}>
                                <CheckCircle2 className="h-2.5 w-2.5" />
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
                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between z-10 relative text-[10px] font-bold">
                      <div className="flex items-center gap-1 text-slate-455">
                        <Clock className="h-3 w-3" />
                        <span>Telemetry:</span>
                        <span className="text-slate-905 font-mono">+{cp.xpReward} XP</span>
                      </div>
                      <span className="text-[8.5px] font-mono text-slate-400 uppercase">
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
