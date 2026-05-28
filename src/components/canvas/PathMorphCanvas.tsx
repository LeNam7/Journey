"use client";
import { useRef, useEffect } from "react";

// PATH MORPH CANVAS (Stage 3 background)
// Connects seamlessly from Stage 2's final state:
//   Torus Knot/Indigo → Creator/Cyan → Founder/Violet → Explorer/Emerald
export function PathMorphCanvas({ progress }: { progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const angleRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;

    const edges: {a:number,b:number}[] = [];
    for (let i = 0; i < 60; i++) {
      edges.push({ a: i, b: (i + 1) % 60 });
      edges.push({ a: i, b: (i + 2) % 60 });
      if (i % 2 === 0) edges.push({ a: i, b: (i + 30) % 60 });
    }

    const getTorusKnot = () => {
      const v: {x:number,y:number,z:number}[] = [];
      for (let i = 0; i < 60; i++) {
        const phi = (i/60)*Math.PI*2, p=2, q=3;
        const r = (Math.cos(q*phi)+2.0)*0.45;
        v.push({ x: r*Math.cos(p*phi), y: r*Math.sin(p*phi), z: -Math.sin(q*phi)*0.45 });
      }
      return v;
    };

    const getCreator = () => {
      const v: {x:number,y:number,z:number}[] = [];
      for (let i = 0; i < 60; i++) {
        const theta = (i/60)*Math.PI*2;
        const phi2 = Math.acos(1-(2*(i+0.5))/60);
        const scale = 1.1*(1+0.3*Math.sin(theta*5));
        v.push({ x: scale*Math.sin(phi2)*Math.cos(theta), y: scale*Math.sin(phi2)*Math.sin(theta), z: scale*Math.cos(phi2)*(1+Math.sqrt(5))/2 });
      }
      return v;
    };

    const getFounder = () => {
      const base: {x:number,y:number,z:number}[] = [];
      for (const s of [1.2, 0.75, 0.35])
        for (const x of [-1,1]) for (const y of [-1,1]) for (const z of [-1,1])
          base.push({x:x*s, y:y*s, z:z*s});
      while (base.length < 60) base.push(base[base.length % 24]);
      return base.slice(0,60);
    };

    const getExplorer = () => {
      const v: {x:number,y:number,z:number}[] = [];
      for (let i = 0; i < 60; i++) {
        const t = (i/60)*Math.PI*4, sp = 0.04*t;
        const r = 0.9+0.3*Math.cos(t*1.5);
        v.push({ x: (r+0.4*Math.cos(t*2.5))*Math.cos(t+sp), y: (r+0.4*Math.cos(t*2.5))*Math.sin(t+sp), z: 0.5*Math.sin(t*2.5)+sp*0.3 });
      }
      return v;
    };

    const colors = [
      { r:99,  g:102, b:241 }, // Indigo  (Stage 2 exit)
      { r:34,  g:211, b:238 }, // Cyan    (Creator)
      { r:167, g:139, b:250 }, // Violet  (Founder)
      { r:52,  g:211, b:153 }, // Emerald (Explorer)
    ];

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const W = canvas.clientWidth, H = canvas.clientHeight;
      if (canvas.width !== W*dpr || canvas.height !== H*dpr) {
        canvas.width = W*dpr; canvas.height = H*dpr; ctx.scale(dpr, dpr);
      }
      ctx.clearRect(0, 0, W, H);

      const t = Math.min(progress * 3.0, 2.9999);
      const seg = Math.floor(t);
      const f = t - seg;

      const shapes = [getTorusKnot(), getCreator(), getFounder(), getExplorer()];
      const src = shapes[seg], dst = shapes[seg + 1];
      const verts = src.map((s, i) => ({ x: s.x*(1-f)+dst[i].x*f, y: s.y*(1-f)+dst[i].y*f, z: s.z*(1-f)+dst[i].z*f }));

      const cS = colors[seg], cD = colors[seg+1];
      const r = Math.round(cS.r*(1-f)+cD.r*f);
      const g = Math.round(cS.g*(1-f)+cD.g*f);
      const b = Math.round(cS.b*(1-f)+cD.b*f);
      const sc = `rgba(${r},${g},${b},1.0)`;
      const glow = `rgb(${r},${g},${b})`;

      angleRef.current.y += 0.009; angleRef.current.x += 0.003;
      const ry = angleRef.current.y, rx = angleRef.current.x;
      const cy=Math.cos(ry),sy=Math.sin(ry),cX=Math.cos(rx),sX=Math.sin(rx);
      const S = Math.min(W,H)*0.38, d=4.0;

      const proj = verts.map(p => {
        const x1=p.x*cy+p.z*sy, z1=-p.x*sy+p.z*cy;
        const y2=p.y*cX-z1*sX, z2=p.y*sX+z1*cX;
        const zS=z2+3;
        return { x:W/2+x1*S*(d/zS), y:H/2+y2*S*(d/zS) };
      });

      ctx.beginPath();
      ctx.strokeStyle=sc; ctx.lineWidth=2.2; ctx.lineCap="round";
      ctx.shadowBlur=30; ctx.shadowColor=glow;
      for (const e of edges) {
        const A=proj[e.a],B=proj[e.b];
        if(A&&B){ ctx.moveTo(A.x,A.y); ctx.lineTo(B.x,B.y); }
      }
      ctx.stroke(); ctx.shadowBlur=0;
      for (const p of proj) {
        ctx.beginPath(); ctx.arc(p.x,p.y,3.5,0,Math.PI*2); ctx.fillStyle="#fff"; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x,p.y,7.0,0,Math.PI*2); ctx.strokeStyle=sc; ctx.lineWidth=0.8; ctx.stroke();
      }
      raf = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(raf);
  }, [progress]);

  return <div className="w-full h-full pointer-events-none select-none"><canvas ref={canvasRef} className="w-full h-full" /></div>;
}
