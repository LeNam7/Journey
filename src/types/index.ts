import React from "react";

export interface TaskCard {
  id: string;
  title: string;
  category: "Origin" | "Adventure" | "Nexus" | "Summit";
  assignee: { name: string; initials: string; color: string };
  status: "todo" | "progress" | "done";
  progress: number;
}

export interface Checkpoint {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  description: string;
  status: "completed" | "active" | "locked";
  color: string;
  gradient: string;
  xpReward: number;
  tasks: string[];
}

export interface PathDetail {
  id: string;
  title: string;
  tagline: string;
  description: string;
  badge: string;
  colorTheme: string;
  actionTitle: string;
  steps: string[];
}

export interface StoryMoment {
  id: number;
  title: string;
  subtitle: string;
  quote: string;
  description: string;
  accentClass: string;
}
