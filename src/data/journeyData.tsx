import React from "react";
import { Lightbulb, Footprints, Mountain, Sparkles, Trophy } from "lucide-react";
import { Checkpoint, PathDetail, StoryMoment } from "@/types";

export const checkpointsData: Checkpoint[] = [
  {
    id: 1,
    title: "The Spark",
    subtitle: "First Spark of Conception",
    icon: <Lightbulb className="h-4.5 w-4.5" />,
    description: "A small idea appears — fragile, exciting, and full of limitless possibility. It starts with curiosity and a simple vision of what could be.",
    status: "completed",
    color: "cyan",
    gradient: "from-cyan-500/10 to-teal-500/10",
    xpReward: 350,
    tasks: ["Draft visual roadmap concepts", "Define target core purpose", "Setup sandbox sandbox"]
  },
  {
    id: 2,
    title: "The First Step",
    subtitle: "Intention Met with Action",
    icon: <Footprints className="h-4.5 w-4.5" />,
    description: "Momentum begins when intention turns into bold action. Stepping out of your comfort zone is where the real work begins.",
    status: "completed",
    color: "violet",
    gradient: "from-violet-500/10 to-indigo-500/10",
    xpReward: 800,
    tasks: ["Configure start canvas grid overlay", "Schedule dedicated slots", "Establish task cards outline"]
  },
  {
    id: 3,
    title: "The Challenge",
    subtitle: "Facing the Crucible of Growth",
    icon: <Mountain className="h-4.5 w-4.5" />,
    description: "Every journey tests your clarity, patience, and absolute belief. This is the messy middle where grit and perseverance define the future.",
    status: "active",
    color: "gold",
    gradient: "from-amber-500/10 to-orange-500/10",
    xpReward: 1600,
    tasks: ["Optimize rendering pipelines & LFO sweep", "Implement scroll transition morphs", "Pivot workspace alignment"]
  },
  {
    id: 4,
    title: "The Breakthrough",
    subtitle: "Clarity Emerging from Chaos",
    icon: <Sparkles className="h-4.5 w-4.5" />,
    description: "Patterns emerge. Confidence grows. Direction becomes absolutely clear. You discover the golden ratio and leverage it efficiently.",
    status: "locked",
    color: "pink",
    gradient: "from-pink-500/10 to-rose-500/10",
    xpReward: 2400,
    tasks: ["Secure system edge sockets", "Perform comprehensive code cleaning", "Refactor global CDN routes"]
  },
  {
    id: 5,
    title: "The Arrival",
    subtitle: "Crossing the Horizon Portal",
    icon: <Trophy className="h-4.5 w-4.5" />,
    description: "The destination is not the end — it is a new beginning. Celebrating the milestone before plotting the next universe to explore.",
    status: "locked",
    color: "pink",
    gradient: "from-amber-400/10 to-pink-500/10",
    xpReward: 5000,
    tasks: ["Launch infinite global domain", "Review retrospective growth logs", "Map next trajectory blueprint"]
  }
];

export const pathsData: Record<string, PathDetail> = {
  creator: {
    id: "creator",
    title: "CREATOR JOURNEY",
    tagline: "BUILD HIGH-FIDELITY VISUAL EXPERIENCES.",
    description: "Tailored for digital artists, visual designers, and front-end curators aiming to turn abstract ideas into beautiful, tangible interactive web systems.",
    badge: "CREATOR PATH",
    colorTheme: "border-fuchsia-500/20 text-fuchsia-600 bg-fuchsia-50/50",
    actionTitle: "VISUAL ARCHITECTURE ROADMAP",
    steps: [
      "Carve your unique visual aesthetic style and blueprint tone.",
      "Generate and publish content, prototypes, and layout iterations.",
      "Cultivate a tight community of frontend builders & design thinkers."
    ]
  },
  founder: {
    id: "founder",
    title: "FOUNDER JOURNEY",
    tagline: "CONQUER SCALABLE WORKFLOW ARCHITECTURE.",
    description: "Engineered for strategic visionaries, system architects, and startup builders focused on developing scalable platforms, optimizing workflows, and solving pain points.",
    badge: "FOUNDER PATH",
    colorTheme: "border-amber-500/20 text-amber-600 bg-amber-50/50",
    actionTitle: "WORKFLOW COMMAND CENTER",
    steps: [
      "Validate deep, complex human pain points and market opportunities.",
      "Launch an ultra-focused lovable MVP and get it into production fast.",
      "Rigorously analyze telemetry metrics and iterate based on real feedback."
    ]
  },
  explorer: {
    id: "explorer",
    title: "EXPLORER JOURNEY",
    tagline: "UNPACK UNCHARTED KNOWLEDGE DOMAINS.",
    description: "Crafted for deep researchers, technology generalists, and avid travelers who thrive on exploring unmapped territory, learning new stacks, and breaking new grounds.",
    badge: "EXPLORER PATH",
    colorTheme: "border-cyan-500/20 text-cyan-600 bg-cyan-50/50",
    actionTitle: "RESEARCH LOG & SANDBOX",
    steps: [
      "Unpack entirely new, demanding fields of theory or technology stacks.",
      "Develop sandbox tests and proof-of-concept software experiments.",
      "Distill discoveries into written journals, open source repos, or public docs."
    ]
  }
};

export const storyMomentsData: StoryMoment[] = [
  {
    id: 0,
    title: "Uncertainty",
    subtitle: "THE FAINT FOG OF THE STARTING LINE",
    quote: "“Clarity is built by moving, not waiting.”",
    description: "Before every great step, there is thick mist. Doubts accumulate, paths fork in a dozen directions, and old safe routines whisper for you to turn back. Embracing this confusion is the very fuel that sparks creative courage.",
    accentClass: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5"
  },
  {
    id: 1,
    title: "Discipline",
    subtitle: "THE QUIET GRIND BEHIND THE SCENES",
    quote: "“The path reveals itself one decision at a time.”",
    description: "The silent hours of rigorous work. No bright spotlights, no instant reactions, and no external validation. Only the rhythmic, steady repetition of dedication carving a permanent pathway through your obstacles.",
    accentClass: "text-violet-450 border-violet-500/20 bg-violet-500/5"
  },
  {
    id: 2,
    title: "Discovery",
    subtitle: "THE SUDDEN SPARKS OF ILLUMINATION",
    quote: "“Growth looks like discomfort before it turns into confidence.”",
    description: "A sudden alignment of values. Elements snap into place. A brilliant new canvas reveals itself, showering you with pristine logic, deep insights, and a profound expansion of your capacity.",
    accentClass: "text-fuchsia-400 border-fuchsia-500/20 bg-fuchsia-500/5"
  },
  {
    id: 3,
    title: "Transformation",
    subtitle: "THE EVOLUTION TO A HIGHER SELF",
    quote: "“You do not finish the journey as the same person who started it.”",
    description: "Casting a glance backward, you realize the final destination wasn't merely a point on the map. It was a rigorous transmutational furnace. You have shed old skins, broke your limits, and stepped out into golden sunlight.",
    accentClass: "text-amber-400 border-amber-500/20 bg-amber-500/5"
  }
];
