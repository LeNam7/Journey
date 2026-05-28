"use client";
import React from "react";
import { motion, MotionValue } from "framer-motion";
import { StoryMoment } from "@/types";

interface Stage4NarrativeProps {
  storyMoments: StoryMoment[];
  stagePercent: number;
  bookOpacity: MotionValue<number> | number;
  bookY: MotionValue<number> | number;
  narrativeY: MotionValue<number> | number;
  scrollWirePathLength: MotionValue<number> | number;
  activeMoment: number;
  opacity0: MotionValue<number> | number;
  opacity1: MotionValue<number> | number;
  opacity2: MotionValue<number> | number;
  opacity3: MotionValue<number> | number;
}

export function Stage4Narrative({
  storyMoments,
  stagePercent,
  bookOpacity,
  bookY,
  narrativeY,
  scrollWirePathLength,
  activeMoment,
  opacity0,
  opacity1,
  opacity2,
  opacity3
}: Stage4NarrativeProps) {
  return (
    <motion.div
      style={{
        opacity: bookOpacity,
        y: bookY,
        pointerEvents: (stagePercent >= 69 && stagePercent < 91) ? "auto" : "none"
      }}
      className="absolute inset-0 flex flex-col justify-center items-center overflow-hidden z-15"
    >
      {/* Winding road assembly track */}
      <motion.div 
        style={{ y: narrativeY }}
        className="relative w-full max-w-4xl h-[1100px] flex justify-center"
      >
        {/* Left winding road SVG line (Fixed non-overlapping column) */}
        <div className="absolute left-10 md:left-40 top-0 bottom-0 w-[80px] pointer-events-none">
          <svg width="80" height="1100" viewBox="0 0 80 1100" className="overflow-visible select-none">
            {/* Background winding wire */}
            <path 
              d="M 40 0 C 10 150, 70 300, 40 450 C 10 600, 70 750, 40 900 C 10 1050, 70 1200, 40 1350" 
              fill="none" 
              className="stroke-slate-800/40 stroke-[3px] stroke-linecap-round" 
            />
            
            {/* Active glowing wire path */}
            <motion.path 
              d="M 40 0 C 10 150, 70 300, 40 450 C 10 600, 70 750, 40 900 C 10 1050, 70 1200, 40 1350" 
              fill="none"
              className="stroke-cyan-400 stroke-[3px] stroke-linecap-round"
              style={{
                pathLength: scrollWirePathLength
              }}
            />
          </svg>
        </div>

        {/* Milestones Stack */}
        <div className="absolute left-0 right-0 top-0 bottom-0 select-none">
          {storyMoments.map((mom, idx) => {
            const opacity = idx === 0 ? opacity0 : idx === 1 ? opacity1 : idx === 2 ? opacity2 : opacity3;
            
            // Spaced perfectly by 300px
            const nodeY = idx === 0 ? 80 : idx === 1 ? 380 : idx === 2 ? 680 : 980;
            
            // Alternating node X offset matching the curves
            const nodeX = (idx % 2 === 0) ? 20 : 60;
            const isActive = activeMoment === idx;

            return (
              <motion.div
                key={mom.id}
                style={{ opacity, top: nodeY }}
                className="absolute left-0 right-0 flex items-start h-[165px] transition-all duration-300 pointer-events-none"
              >
                {/* Active Node Circle on the curve (Shares exact same base left column coordinate) */}
                <div 
                  style={{ left: `${nodeX}px` }}
                  className="absolute left-10 md:left-40 w-12 h-12 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <div className={`w-8 h-8 rounded-full bg-[#0a0b0d] border-2 flex items-center justify-center relative shadow-xl transition-all duration-500 ${isActive ? "border-cyan-400 text-white" : "border-slate-800 text-slate-650"}`}>
                    <span className="text-[9px] font-mono font-extrabold">
                      0{idx + 1}
                    </span>
                    {isActive && (
                      <>
                        <div className="absolute inset-0 rounded-full border border-cyan-400 animate-ping opacity-75" />
                        <div className="absolute -inset-1 rounded-full border border-cyan-500/25 blur-[2px]" />
                      </>
                    )}
                  </div>
                </div>

                {/* Story content card sits cleanly on the right column (Never overlaps) */}
                <div 
                  className="absolute left-28 md:left-[270px] flex flex-col space-y-2 text-left max-w-xl pr-6 -translate-y-1/2 z-10 pointer-events-auto"
                >
                  <div>
                    <span className={`text-[8px] font-mono font-extrabold px-2.5 py-0.5 rounded-full border transition-all duration-500 ${isActive ? mom.accentClass : "bg-transparent border-slate-800 text-slate-500"}`}>
                      {mom.subtitle}
                    </span>
                  </div>

                  <h3 className={`font-sora text-lg sm:text-xl font-extrabold tracking-tight transition-colors duration-550 ${isActive ? "text-white" : "text-slate-505"}`}>
                    {mom.title}
                  </h3>

                  <blockquote className={`border-l-2 pl-3 py-0.5 italic text-xs transition-colors duration-550 ${isActive ? "border-cyan-400 text-slate-300 font-medium" : "border-slate-800 text-slate-600"}`}>
                    {mom.quote}
                  </blockquote>

                  <p className={`text-[10px] sm:text-xs leading-relaxed font-semibold transition-colors duration-550 ${isActive ? "text-slate-400" : "text-slate-600"}`}>
                    {mom.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
