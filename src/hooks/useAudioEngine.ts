"use client";
import { useEffect, useRef, useState } from "react";
import { MotionValue } from "framer-motion";

export function useAudioEngine(scrollYProgress: MotionValue<number>) {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{
    oscs: OscillatorNode[];
    filter: BiquadFilterNode;
    lfo: OscillatorNode;
    gainNode: GainNode;
  } | null>(null);

  const toggleAmbientAudio = () => {
    if (audioEnabled) {
      if (synthNodesRef.current) {
        const { gainNode, oscs, lfo } = synthNodesRef.current;
        gainNode.gain.setValueAtTime(gainNode.gain.value, audioContextRef.current!.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContextRef.current!.currentTime + 1.0);
        setTimeout(() => {
          try {
            oscs.forEach(osc => osc.stop());
            lfo.stop();
          } catch (e) {}
          if (audioContextRef.current && audioContextRef.current.state !== "closed") {
            audioContextRef.current.close();
            audioContextRef.current = null;
            synthNodesRef.current = null;
          }
        }, 1100);
      }
      setAudioEnabled(false);
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioContextRef.current = ctx;

        // Pentatonic, harmonious drone chords
        const baseFreq = 55; // Low A
        
        const osc1 = ctx.createOscillator();
        osc1.type = "triangle";
        osc1.frequency.setValueAtTime(baseFreq, ctx.currentTime);

        const osc2 = ctx.createOscillator();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(baseFreq * 1.5, ctx.currentTime); // E

        const osc3 = ctx.createOscillator();
        osc3.type = "triangle";
        osc3.frequency.setValueAtTime(baseFreq * 2, ctx.currentTime); // Octave A

        const osc1Gain = ctx.createGain();
        osc1Gain.gain.setValueAtTime(0.24, ctx.currentTime);
        const osc2Gain = ctx.createGain();
        osc2Gain.gain.setValueAtTime(0.18, ctx.currentTime);
        const osc3Gain = ctx.createGain();
        osc3Gain.gain.setValueAtTime(0.05, ctx.currentTime);

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(140, ctx.currentTime);
        filter.Q.setValueAtTime(3.5, ctx.currentTime);

        const lfo = ctx.createOscillator();
        lfo.type = "sine";
        lfo.frequency.setValueAtTime(0.045, ctx.currentTime); // slow wind cycle
        
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(18, ctx.currentTime);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0, ctx.currentTime);

        osc1.connect(osc1Gain);
        osc2.connect(osc2Gain);
        osc3.connect(osc3Gain);

        osc1Gain.connect(filter);
        osc2Gain.connect(filter);
        osc3Gain.connect(filter);

        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc1.start();
        osc2.start();
        osc3.start();
        lfo.start();

        gainNode.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 1.5);

        synthNodesRef.current = {
          oscs: [osc1, osc2, osc3],
          filter,
          lfo,
          gainNode
        };
        setAudioEnabled(true);
      } catch (err) {
        console.error("Audio Context rejected", err);
      }
    }
  };

  // Sound modulation triggered on scroll speed
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (synthNodesRef.current && audioContextRef.current) {
        const { filter, oscs } = synthNodesRef.current;
        const ctx = audioContextRef.current;

        const newFreq = 140 + latest * 200;
        filter.frequency.setTargetAtTime(newFreq, ctx.currentTime, 0.35);

        const baseFreq = 55 + latest * 1.5;
        oscs[0].frequency.setTargetAtTime(baseFreq, ctx.currentTime, 0.4);
        oscs[1].frequency.setTargetAtTime(baseFreq * 1.5, ctx.currentTime, 0.4);
        oscs[2].frequency.setTargetAtTime(baseFreq * 2, ctx.currentTime, 0.4);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Click Sound effect generator (switch click tick)
  const playClickTickSound = () => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    
    try {
      const bufferSize = ctx.sampleRate * 0.025; // 25ms tick
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1100;
      
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.02);
      
      noise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      noise.start();
    } catch (e) {}
  };

  // Checkpoint hover wave trigger tone
  const playCheckpointTone = (nodeId: number) => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    
    try {
      const scale = [261.63, 293.66, 329.63, 392.00, 440.00]; // C4, D4, E4, G4, A4
      const freq = scale[(nodeId - 1) % scale.length];
      
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.03, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.7);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch (e) {}
  };

  return {
    audioEnabled,
    toggleAmbientAudio,
    playClickTickSound,
    playCheckpointTone
  };
}
