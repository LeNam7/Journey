"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Lenis from "lenis";
import { Volume2 } from "lucide-react";

// Modular Canvas Components
import { PathMorphCanvas } from "@/components/canvas/PathMorphCanvas";
import { StarrySkyCanvas } from "@/components/canvas/StarrySkyCanvas";
import { Abstract3DCanvas } from "@/components/canvas/Abstract3DCanvas";

// Modular Section Components
import { Stage1Conception } from "@/components/sections/Stage1Conception";
import { Stage2TimelineMap } from "@/components/sections/Stage2TimelineMap";
import { Stage3Slides } from "@/components/sections/Stage3Slides";
import { Stage4Narrative } from "@/components/sections/Stage4Narrative";
import { Stage5Telemetry } from "@/components/sections/Stage5Telemetry";

// Custom Hooks
import { useAudioEngine } from "@/hooks/useAudioEngine";

// Data Interfaces & Configurations
import { TaskCard } from "@/types";
import { checkpointsData as checkpoints, pathsData as paths, storyMomentsData as storyMoments } from "@/data/journeyData";


// MAIN WEB PAGE COMPONENT
// ==========================================
export default function Home() {
  const [activeCheckpoint, setActiveCheckpoint] = useState<number>(1); // The Spark (Step 1)
  const [isScrolled, setIsScrolled] = useState(false);

  const [stage2Progress, setStage2Progress] = useState<number>(0); // Unified continuous morphing playhead starts at 0
  const [stage3Progress, setStage3Progress] = useState<number>(0); // 0→1 continuous morph for Stage 3 background


  // References for scroll tracking
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Custom cursor position state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorHovering, setCursorHovering] = useState(false);

  // Tracking mouse coordinate for 3D card tilt
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });

  // Kanban Growth Board Task State
  const [tasks, setTasks] = useState<TaskCard[]>([
    {
      id: "t1",
      title: "The Spark: Draft visual roadmap concepts",
      category: "Origin",
      assignee: { name: "Nancy Martino", initials: "NM", color: "bg-fuchsia-500 text-white" },
      status: "done",
      progress: 100
    },
    {
      id: "t2",
      title: "The First Step: Configure start canvas grid overlay",
      category: "Origin",
      assignee: { name: "Nancy Martino", initials: "NM", color: "bg-fuchsia-500 text-white" },
      status: "done",
      progress: 100
    },
    {
      id: "t3",
      title: "The Challenge: Optimize rendering pipelines & LFO sweep",
      category: "Adventure",
      assignee: { name: "Nancy Martino", initials: "NM", color: "bg-fuchsia-500 text-white" },
      status: "progress",
      progress: 60
    },
    {
      id: "t4",
      title: "The Breakthrough: Secure system edge sockets",
      category: "Nexus",
      assignee: { name: "Alex Rivers", initials: "AR", color: "bg-cyan-500 text-white" },
      status: "todo",
      progress: 0
    },
    {
      id: "t5",
      title: "The Arrival: Launch infinite global domain",
      category: "Summit",
      assignee: { name: "Alex Rivers", initials: "AR", color: "bg-cyan-500 text-white" },
      status: "todo",
      progress: 0
    }
  ]);

  // Toggle tasks status dynamically from other interactive components
  const toggleTaskStatus = (id: string, nextStatus: "todo" | "progress" | "done") => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id
          ? {
               ...t,
               status: nextStatus,
               progress: nextStatus === "done" ? 100 : nextStatus === "progress" ? 60 : 0
            }
          : t
      )
    );
  };

  // Ref to hold Lenis smooth scroll instance
  const lenisRef = useRef<Lenis | null>(null);

  // Global scroll metrics
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 24,
    restDelta: 0.001
  });

  // Custom Audio Engine hook
  const {
    audioEnabled,
    toggleAmbientAudio,
    playClickTickSound,
    playCheckpointTone
  } = useAudioEngine(scrollYProgress);

  const [activeMoment, setActiveMoment] = useState(0);
  const [stagePercent, setStagePercent] = useState(0);


  // Guarantee page starts at the top (0,0) on enter/refresh and disable auto scroll restoration
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    }
  }, []);

  // ==========================================
  // MOUSE & CURSOR EVENTS
  // ==========================================
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Calculate 3D tilt percentages from center screen
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      setCardTilt({ x: dx * 15, y: dy * -15 }); // Tilt bounds
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // ==========================================
  // LENIS SMOOTH SCROLL SPACER
  // ==========================================
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ultra smooth physics ease
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Force snap back to top on mount
    lenis.scrollTo(0, { immediate: true });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Update header and local active items based on smooth scroll metrics
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      setStagePercent(Math.round(latest * 100));
      setIsScrolled(latest > 0.05);

      // Determine active storymoment during Slide Stage 4 (0.70 to 0.90)
      if (latest >= 0.70 && latest <= 0.90) {
        const relativeVal = (latest - 0.70) / 0.20; // 0 to 1
        const activeIdx = Math.min(Math.floor(relativeVal * 4), 3);
        if (activeIdx !== activeMoment) {
          setActiveMoment(activeIdx);
        }
      }

      // Determine active checkpoint during Stage 2 (0.19 to 0.44)
      if (latest >= 0.19 && latest <= 0.44) {
        const relativeVal = (latest - 0.19) / 0.25; // 0 to 1
        setStage2Progress(relativeVal);
        const activeIdx = Math.min(Math.floor(relativeVal * 5), 4);
        const activeNodeId = activeIdx + 1; // 1 to 5
        if (activeNodeId !== activeCheckpoint) {
          setActiveCheckpoint(activeNodeId);
        }
      } else if (latest < 0.19) {
        setStage2Progress(0);
      } else if (latest > 0.44) {
        setStage2Progress(1);
      }
      // Determine active path slide during Stage 3 (0.47 to 0.69)
      if (latest >= 0.47 && latest <= 0.69) {
        const relativeVal = (latest - 0.47) / 0.22; // 0 to 1
        setStage3Progress(relativeVal);
      } else if (latest < 0.47) {
        setStage3Progress(0);
      } else if (latest > 0.69) {
        setStage3Progress(1);
      }
    });
    return () => unsubscribe();
  }, [smoothProgress, activeMoment, activeCheckpoint]);


  // ==========================================
  // ADVANCED CINEMATIC MOTION MAPPING (PLAYHEAD)
  // ==========================================
  
  // -- Background styling morph (make it transparent to let starry sky canvas shine through)
  const bgTheme = "transparent";
  const gridOpacity = useTransform(smoothProgress, [0.67, 0.71, 0.90, 0.92], [0.35, 0.15, 0.15, 0.35]);

  // -- Stage 1: HERO ELEMENTS
  const heroOpacity = useTransform(smoothProgress, [0.0, 0.12, 0.16], [1, 1, 0]);
  const heroY = useTransform(smoothProgress, [0.0, 0.16], [0, -70]);

  // -- Kanban Board Mockup: Dissolve & morph schematic transition
  const boardScale = useTransform(smoothProgress, [0.0, 0.12, 0.18], [1, 1, 0.65]);
  const boardX = useTransform(smoothProgress, [0.0, 0.12, 0.18], ["0%", "0%", "-38%"]);
  const boardY = useTransform(smoothProgress, [0.0, 0.18], [0, 50]);
  const boardOpacity = useTransform(smoothProgress, [0.0, 0.12, 0.18], [1, 1, 0]);
  // Tilt transforms flat out
  const boardRotateX = useTransform(smoothProgress, [0.0, 0.12, 0.18], [12, 12, 0]);
  const boardRotateY = useTransform(smoothProgress, [0.0, 0.12, 0.18], [-18, -18, 0]);
  const boardRotateZ = useTransform(smoothProgress, [0.0, 0.12, 0.18], [3, 3, 0]);

  // -- Stage 2: TIMELINE NODES
  const timelineOpacity = useTransform(smoothProgress, [0.16, 0.19, 0.44, 0.47], [0, 1, 1, 0]);
  const timelineY = useTransform(smoothProgress, [0.16, 0.19, 0.44, 0.47], [60, 0, 0, -60]);
  const mapProgressLineHeight = useTransform(smoothProgress, [0.19, 0.42], ["0%", "100%"]);

  // -- Stage 3: TRAJECTORY — 3 individual scroll-driven slides
  // Each slide occupies ~1/3 of the 0.47→0.69 window
  const slide1Opacity = useTransform(smoothProgress, [0.47, 0.50, 0.545, 0.575], [0, 1, 1, 0]);
  const slide1Y = useTransform(smoothProgress, [0.47, 0.50, 0.545, 0.575], [60, 0, 0, -60]);
  const slide2Opacity = useTransform(smoothProgress, [0.565, 0.585, 0.615, 0.645], [0, 1, 1, 0]);
  const slide2Y = useTransform(smoothProgress, [0.565, 0.585, 0.615, 0.645], [60, 0, 0, -60]);
  const slide3Opacity = useTransform(smoothProgress, [0.635, 0.655, 0.685, 0.695], [0, 1, 1, 0]);
  const slide3Y = useTransform(smoothProgress, [0.635, 0.655, 0.685, 0.695], [60, 0, 0, -60]);
  // Horizontal bridge wire: appears at end of Stage 3, sweeps right-to-left into Narrative
  const bridgeWireProgress = useTransform(smoothProgress, [0.655, 0.695], [0, 1]);
  // Keep legacy trajectoryOpacity for pointerEvents guard
  const trajectoryOpacity = useTransform(smoothProgress, [0.47, 0.50, 0.67, 0.69], [0, 1, 1, 0]);
  const trajectoryY = useTransform(smoothProgress, [0.47, 0.50, 0.67, 0.69], [60, 0, 0, -60]);

  // -- Stage 4: DARK STAGE STORYBOOK MOMENTS
  const bookOpacity = useTransform(smoothProgress, [0.69, 0.71, 0.90, 0.92], [0, 1, 1, 0]);
  const bookY = useTransform(smoothProgress, [0.69, 0.71, 0.90, 0.92], [60, 0, 0, -60]);

  // Opacities for the individual narrative slides (Milestones trail along winding road)
  const opacity0 = useTransform(smoothProgress, [0.69, 0.71, 0.76, 0.89, 0.91], [0, 1, 0.15, 0.15, 0]);
  const opacity1 = useTransform(smoothProgress, [0.69, 0.71, 0.76, 0.81, 0.89, 0.91], [0, 0.15, 1, 0.15, 0.15, 0]);
  const opacity2 = useTransform(smoothProgress, [0.69, 0.76, 0.81, 0.86, 0.89, 0.91], [0, 0.15, 1, 0.15, 0.15, 0]);
  const opacity3 = useTransform(smoothProgress, [0.69, 0.81, 0.86, 0.89, 0.91], [0, 0.15, 1, 1, 0]);

  // Cinematic Y tracking: translates the entire winding road container upwards
  const narrativeY = useTransform(smoothProgress, [0.69, 0.71, 0.76, 0.81, 0.86, 0.89], [220, 220, -80, -380, -680, -680]);

  // Active glowing path growing length
  const scrollWirePathLength = useTransform(smoothProgress, [0.69, 0.89], [0.05, 0.95]);

  // Spinning circular grids
  const spinAngleCW = useTransform(smoothProgress, [0.69, 0.91], [0, 360]);
  const spinAngleCCW = useTransform(smoothProgress, [0.69, 0.91], [360, 0]);

  // -- Stage 5: TELEMETRY METRICS & HORIZON
  const metricsOpacity = useTransform(smoothProgress, [0.91, 0.94, 1.0], [0, 1, 1]);
  const metricsY = useTransform(smoothProgress, [0.91, 0.94, 1.0], [60, 0, 0]);



  // Navigation playhead snapper
  const scrollToStagePercentage = (percent: number) => {
    if (lenisRef.current) {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const targetY = scrollHeight * percent;
      lenisRef.current.scrollTo(targetY, {
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({
        top: scrollHeight * percent,
        behavior: "smooth"
      });
    }
  };


  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor: bgTheme }}
      className="relative min-h-screen w-full overflow-x-hidden font-jakarta text-slate-200 selection:bg-slate-200 selection:text-slate-950 transition-colors duration-1000"
    >
      
      {/* 1. Global scrollspacer elements (1000vh to drive native Lenis mousewheel) */}
      <div className="h-[1000vh] w-full pointer-events-none select-none z-0" />

      {/* 2. Custom Physical Cursor (Hides on touchscreens) */}
      <motion.div
        className="cursor-dot border border-slate-950 hidden sm:block pointer-events-none"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          width: cursorHovering ? 64 : 14,
          height: cursorHovering ? 64 : 14,
          backgroundColor: cursorHovering ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 1)",
          borderColor: cursorHovering ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 1)",
        }}
        transition={{ type: "spring", stiffness: 450, damping: 28, mass: 0.2 }}
      />

      {/* 3. FIXED VIEWPORT THEATER CANVAS */}
      <div className="fixed inset-0 w-screen h-screen overflow-hidden flex flex-col z-10 select-none">
        
        {/* Deep Starry Sky Canvas Background */}
        <StarrySkyCanvas scrollProgress={stagePercent / 100} tilt={cardTilt} />

        {/* Stage 2 Fullscreen 3D Morphing Canvas */}
        <motion.div
          style={{ opacity: timelineOpacity }}
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
        >
          <div className="w-full h-full opacity-[0.35] md:opacity-[0.45]">
            <Abstract3DCanvas progress={stage2Progress} tilt={cardTilt} />
          </div>
        </motion.div>

        {/* Stage 3 Fullscreen Path Morph Canvas */}
        <motion.div
          style={{ opacity: trajectoryOpacity }}
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
        >
          <div className="w-full h-full opacity-[0.38] md:opacity-[0.48]">
            <PathMorphCanvas progress={stage3Progress} />
          </div>
        </motion.div>

        {/* Structural Blueprint Grid modulated by Scroll Stage */}
        <motion.div
          style={{ opacity: gridOpacity }}
          className="absolute inset-0 blueprint-grid pointer-events-none z-0"
        />

        {/* Dynamic ambient coordinate highlights */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full ambient-glow-purple pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-[750px] h-[750px] rounded-full ambient-glow-cyan pointer-events-none z-0" />

        {/* Blueprint Tidy Coordinate Logs */}
        <div className="absolute top-22 left-8 text-[9px] font-mono text-slate-400 tracking-widest pointer-events-none uppercase">
          JOURNEY v2.5.0 // COORD: [001 — 002] // SPEED: {Math.round(stagePercent * 1.5)} M/S
        </div>
        <div className="absolute bottom-8 left-8 text-[9px] font-mono text-slate-400 tracking-widest pointer-events-none uppercase">
          SYS.LOC: [SEA_EDGE_02] // ALIGNMENT: [TRUE]
        </div>
        <div className="absolute bottom-8 right-8 text-[9px] font-mono text-slate-400 tracking-widest pointer-events-none uppercase">
          STAGE PROGRESS: [{stagePercent}%] // MATRIX ACTIVE
        </div>

        {/* ==========================================
            IMMERSIVE HEADER NAVBAR
            ========================================== */}
        <header
          className={`w-full z-45 border-b transition-all duration-700 py-4 ${
            isScrolled
              ? "bg-slate-950/70 border-white/10 backdrop-blur-md shadow-sm"
              : "bg-transparent border-transparent"
          }`}
        >
          <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
            
            {/* Logo */}
            <div
              onClick={() => scrollToStagePercentage(0.0)}
              onMouseEnter={() => setCursorHovering(true)}
              onMouseLeave={() => setCursorHovering(false)}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <span className="font-sora text-xl font-bold tracking-widest text-white">
                JOURNEY
              </span>
              <div className="hidden lg:block w-[1px] h-4 bg-white/10" />
              <span className="hidden lg:block text-[9px] font-mono text-slate-400 tracking-wider">
                THE SINGLE-STAGE THEATER EXPERIMENT
              </span>
            </div>

            {/* Quick playhead snapping links */}
            <nav className="hidden md:flex items-center gap-10 text-xs font-extrabold uppercase tracking-widest text-slate-400">
              <button
                onClick={() => scrollToStagePercentage(0.0)}
                onMouseEnter={() => setCursorHovering(true)}
                onMouseLeave={() => setCursorHovering(false)}
                className={`hover:text-white transition-colors cursor-pointer ${stagePercent < 16 ? "text-white underline underline-offset-4" : ""}`}
              >
                Concept
              </button>
              <button
                onClick={() => scrollToStagePercentage(0.20)}
                onMouseEnter={() => setCursorHovering(true)}
                onMouseLeave={() => setCursorHovering(false)}
                className={`hover:text-white transition-colors cursor-pointer ${stagePercent >= 16 && stagePercent < 47 ? "text-white underline underline-offset-4" : ""}`}
              >
                Timeline Map
              </button>
              <button
                onClick={() => scrollToStagePercentage(0.58)}
                onMouseEnter={() => setCursorHovering(true)}
                onMouseLeave={() => setCursorHovering(false)}
                className={`hover:text-white transition-colors cursor-pointer ${stagePercent >= 47 && stagePercent < 69 ? "text-white underline underline-offset-4" : ""}`}
              >
                Trajectories
              </button>
              <button
                onClick={() => scrollToStagePercentage(0.80)}
                onMouseEnter={() => setCursorHovering(true)}
                onMouseLeave={() => setCursorHovering(false)}
                className={`hover:text-white transition-colors cursor-pointer ${stagePercent >= 69 && stagePercent < 91 ? "text-white underline underline-offset-4" : ""}`}
              >
                Narrative
              </button>
              <button
                onClick={() => scrollToStagePercentage(0.97)}
                onMouseEnter={() => setCursorHovering(true)}
                onMouseLeave={() => setCursorHovering(false)}
                className={`hover:text-white transition-colors cursor-pointer ${stagePercent >= 91 ? "text-white underline underline-offset-4" : ""}`}
              >
                Telemetry
              </button>
            </nav>

            <div className="flex items-center gap-3">
              {/* Web Audio Synth Switch */}
              <button
                onClick={toggleAmbientAudio}
                onMouseEnter={() => setCursorHovering(true)}
                onMouseLeave={() => setCursorHovering(false)}
                className={`flex items-center justify-center p-2 rounded-lg border transition-all ${
                  audioEnabled
                    ? "bg-white border-white text-slate-950 shadow-md"
                    : "bg-white/10 border-white/10 text-slate-400 hover:text-white hover:bg-white/20"
                }`}
                title={audioEnabled ? "Silence mysty space drone" : "Activate reactive cosmic synthesis"}
              >
                <Volume2 className={`h-4.5 w-4.5 ${audioEnabled ? "animate-pulse" : ""}`} />
              </button>

              <button
                onClick={() => scrollToStagePercentage(0.96)}
                onMouseEnter={() => setCursorHovering(true)}
                onMouseLeave={() => setCursorHovering(false)}
                className="hidden sm:flex items-center justify-center px-4 py-2 border border-white/30 rounded-full font-bold text-xs uppercase tracking-widest bg-transparent hover:bg-white hover:text-slate-950 text-slate-200 transition-all duration-300"
              >
                Sign In
              </button>

              <button
                onClick={() => scrollToStagePercentage(0.30)}
                onMouseEnter={() => setCursorHovering(true)}
                onMouseLeave={() => setCursorHovering(false)}
                className="hidden sm:flex items-center justify-center px-4 py-2 bg-white text-slate-950 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        </header>

        {/* ==========================================
            UNIFIED INTERACTIVE THEATER STAGE (THE INTERNET CANVAS)
            ========================================== */}
        <div className="flex-1 w-full relative z-10 max-w-7xl mx-auto px-6 flex items-center justify-center">

          {/* --- STAGE 1 CONCEPTION --- */}
          <Stage1Conception
            heroOpacity={heroOpacity}
            heroY={heroY}
            stagePercent={stagePercent}
            boardScale={boardScale}
            boardX={boardX}
            boardY={boardY}
            boardOpacity={boardOpacity}
            boardRotateX={boardRotateX}
            boardRotateY={boardRotateY}
            boardRotateZ={boardRotateZ}
            cardTilt={cardTilt}
            tasks={tasks}
            scrollToStagePercentage={scrollToStagePercentage}
            playClickTickSound={playClickTickSound}
            toggleAmbientAudio={toggleAmbientAudio}
            setCursorHovering={setCursorHovering}
          />


          {/* --- STAGE 2 TIMELINE ROADMAP --- */}
          <Stage2TimelineMap
            checkpoints={checkpoints}
            activeCheckpoint={activeCheckpoint}
            stage2Progress={stage2Progress}
            cardTilt={cardTilt}
            timelineOpacity={timelineOpacity}
            timelineY={timelineY}
            stagePercent={stagePercent}
            mapProgressLineHeight={mapProgressLineHeight}
            tasks={tasks}
            toggleTaskStatus={toggleTaskStatus}
            scrollToStagePercentage={scrollToStagePercentage}
            playClickTickSound={playClickTickSound}
            playCheckpointTone={playCheckpointTone}
            setCursorHovering={setCursorHovering}
          />

          {/* ==================================================
              STAGE 3: PATH TRAJECTORIES — SHARED MORPH BG + 3 SLIDES
              ================================================== */}



          {/* --- STAGE 3 SLIDES --- */}
          <Stage3Slides
            paths={paths}
            stagePercent={stagePercent}
            trajectoryOpacity={trajectoryOpacity}
            slide1Opacity={slide1Opacity}
            slide1Y={slide1Y}
            slide2Opacity={slide2Opacity}
            slide2Y={slide2Y}
            slide3Opacity={slide3Opacity}
            slide3Y={slide3Y}
            bridgeWireProgress={bridgeWireProgress}
          />

          {/* --- STAGE 4 Narrative WINDING PATH --- */}
          <Stage4Narrative
            storyMoments={storyMoments}
            stagePercent={stagePercent}
            bookOpacity={bookOpacity}
            bookY={bookY}
            narrativeY={narrativeY}
            scrollWirePathLength={scrollWirePathLength}
            activeMoment={activeMoment}
            opacity0={opacity0}
            opacity1={opacity1}
            opacity2={opacity2}
            opacity3={opacity3}
          />

          {/* --- STAGE 5 TELEMETRY --- */}
          <Stage5Telemetry
            stagePercent={stagePercent}
            metricsOpacity={metricsOpacity}
            metricsY={metricsY}
            onRestart={() => {
              playClickTickSound();
              scrollToStagePercentage(0.0);
              alert("Congratulations! Interactive Trajectory Initiated. Navigate using the top navbar or scroll slowly!");
            }}
            onMouseEnter={() => setCursorHovering(true)}
            onMouseLeave={() => setCursorHovering(false)}
          />

        </div>
      </div>

    </motion.div>
  );
}
