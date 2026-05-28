"use client";
import { useRef, useEffect } from "react";

interface Point3D { x: number; y: number; z: number; }
interface Edge { a: number; b: number; }

// 3D PROCEDURAL GEOMETRIC PROJECTION ENGINE (Stage 2 background)
// Morphs through 5 shapes: StarTetra → Mobius → Tesseract → Icosahedron → TorusKnot
// Colors: Cyan → Fuchsia → Amber → Emerald → Indigo
export function Abstract3DCanvas({ progress, tilt }: { progress: number; tilt: { x: number; y: number } }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const angleRef = useRef({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrameId: number;

    const getStarTetrahedronVertices = (): Point3D[] => {
      const base = [
        { x: 1, y: 1, z: 1 }, { x: 1, y: -1, z: -1 }, { x: -1, y: 1, z: -1 }, { x: -1, y: -1, z: 1 },
        { x: -1, y: -1, z: -1 }, { x: -1, y: 1, z: 1 }, { x: 1, y: -1, z: 1 }, { x: 1, y: 1, z: -1 }
      ];
      const vertices: Point3D[] = [];
      for (let i = 0; i < 60; i++) vertices.push(base[i % 8]);
      return vertices;
    };

    const getMobiusStripVertices = (): Point3D[] => {
      const vertices: Point3D[] = [];
      const steps = 30, R = 1.35;
      for (let i = 0; i < steps; i++) {
        const theta = (i / steps) * Math.PI * 2;
        const w1 = 0.4;
        vertices.push({ x: (R+w1*Math.cos(theta/2))*Math.cos(theta), y: (R+w1*Math.cos(theta/2))*Math.sin(theta), z: w1*Math.sin(theta/2) });
        const w2 = -0.4;
        vertices.push({ x: (R+w2*Math.cos(theta/2))*Math.cos(theta), y: (R+w2*Math.cos(theta/2))*Math.sin(theta), z: w2*Math.sin(theta/2) });
      }
      return vertices;
    };

    const getTesseractVertices = (): Point3D[] => {
      const base: Point3D[] = [];
      for (let x of [-1,1]) for (let y of [-1,1]) for (let z of [-1,1]) base.push({ x:x*1.25, y:y*1.25, z:z*1.25 });
      for (let x of [-1,1]) for (let y of [-1,1]) for (let z of [-1,1]) base.push({ x:x*0.6, y:y*0.6, z:z*0.6 });
      const vertices: Point3D[] = [];
      for (let i = 0; i < 60; i++) vertices.push(base[i % 16]);
      return vertices;
    };

    const getIcosahedronVertices = (): Point3D[] => {
      const phi = (1+Math.sqrt(5))/2, s = 0.95;
      const base = [
        {x:-s,y:phi*s,z:0},{x:s,y:phi*s,z:0},{x:-s,y:-phi*s,z:0},{x:s,y:-phi*s,z:0},
        {x:0,y:-s,z:phi*s},{x:0,y:s,z:phi*s},{x:0,y:-s,z:-phi*s},{x:0,y:s,z:-phi*s},
        {x:phi*s,y:0,z:-s},{x:phi*s,y:0,z:s},{x:-phi*s,y:0,z:-s},{x:-phi*s,y:0,z:s}
      ];
      const vertices: Point3D[] = [];
      for (let i = 0; i < 60; i++) vertices.push(base[i % 12]);
      return vertices;
    };

    const getTorusKnotVertices = (): Point3D[] => {
      const vertices: Point3D[] = [];
      for (let i = 0; i < 60; i++) {
        const phi = (i/60)*Math.PI*2, p=2, q=3;
        const r = (Math.cos(q*phi)+2.0)*0.45;
        vertices.push({ x: r*Math.cos(p*phi), y: r*Math.sin(p*phi), z: -Math.sin(q*phi)*0.45 });
      }
      return vertices;
    };

    const edges: Edge[] = [];
    for (let i = 0; i < 60; i++) {
      edges.push({ a: i, b: (i + 1) % 60 });
      edges.push({ a: i, b: (i + 2) % 60 });
      if (i % 2 === 0) edges.push({ a: i, b: (i + 30) % 60 });
    }

    const colorCheckpoints = [
      { r:34,  g:211, b:238 }, // Cyan
      { r:232, g:121, b:249 }, // Fuchsia
      { r:251, g:191, b:36  }, // Amber
      { r:52,  g:211, b:153 }, // Emerald
      { r:99,  g:102, b:241 }, // Indigo
    ];

    const render = () => {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth, height = canvas.clientHeight;
      if (canvas.width !== width*dpr || canvas.height !== height*dpr) {
        canvas.width=width*dpr; canvas.height=height*dpr; ctx.scale(dpr,dpr);
      }
      ctx.clearRect(0,0,width,height);

      const m1=getStarTetrahedronVertices(), m2=getMobiusStripVertices();
      const m3=getTesseractVertices(), m4=getIcosahedronVertices(), m5=getTorusKnotVertices();

      const t = progress * 4.0;
      const segment = Math.min(Math.floor(t), 3);
      const segmentProgress = t - segment;

      const sourceModel = segment===0?m1:segment===1?m2:segment===2?m3:m4;
      const targetModel  = segment===0?m2:segment===1?m3:segment===2?m4:m5;

      const interpolatedVertices: Point3D[] = [];
      for (let i = 0; i < 60; i++) {
        const sP=sourceModel[i], tP=targetModel[i];
        interpolatedVertices.push({
          x: sP.x*(1-segmentProgress)+tP.x*segmentProgress,
          y: sP.y*(1-segmentProgress)+tP.y*segmentProgress,
          z: sP.z*(1-segmentProgress)+tP.z*segmentProgress,
        });
      }

      const cSource=colorCheckpoints[segment], cTarget=colorCheckpoints[segment+1];
      const r=Math.round(cSource.r*(1-segmentProgress)+cTarget.r*segmentProgress);
      const g=Math.round(cSource.g*(1-segmentProgress)+cTarget.g*segmentProgress);
      const b=Math.round(cSource.b*(1-segmentProgress)+cTarget.b*segmentProgress);
      const strokeColor=`rgba(${r},${g},${b},1.0)`;
      const shadowColor=`rgb(${r},${g},${b})`;

      angleRef.current.y += 0.009; angleRef.current.x += 0.003;
      const baseRx = angleRef.current.x + (tilt.y * Math.PI / 180);
      const baseRy = angleRef.current.y + (tilt.x * Math.PI / 180);
      const baseRz = angleRef.current.z;
      const cosX=Math.cos(baseRx),sinX=Math.sin(baseRx);
      const cosY=Math.cos(baseRy),sinY=Math.sin(baseRy);
      const cosZ=Math.cos(baseRz),sinZ=Math.sin(baseRz);

      const centerX=width/2, centerY=height/2;
      const scaleFactor=Math.min(width,height)*0.38, d=4.0;
      const projectedPoints: {x:number,y:number}[] = [];

      for (let p of interpolatedVertices) {
        let x1=p.x*cosZ-p.y*sinZ, y1=p.x*sinZ+p.y*cosZ, z1=p.z;
        let x2=x1, y2=y1*cosX-z1*sinX, z2=y1*sinX+z1*cosX;
        let x3=x2*cosY+z2*sinY, y3=y2, z3=-x2*sinY+z2*cosY;
        const zShift=z3+3.0;
        projectedPoints.push({ x:centerX+x3*scaleFactor*(d/zShift), y:centerY+y3*scaleFactor*(d/zShift) });
      }

      ctx.beginPath();
      ctx.strokeStyle=strokeColor; ctx.lineWidth=2.2; ctx.lineCap="round"; ctx.lineJoin="round";
      ctx.shadowBlur=30; ctx.shadowColor=shadowColor;
      for (let edge of edges) {
        const pA=projectedPoints[edge.a], pB=projectedPoints[edge.b];
        if(pA&&pB){ ctx.moveTo(pA.x,pA.y); ctx.lineTo(pB.x,pB.y); }
      }
      ctx.stroke(); ctx.shadowBlur=0;

      for (let p of projectedPoints) {
        ctx.beginPath(); ctx.arc(p.x,p.y,3.5,0,Math.PI*2); ctx.fillStyle="#ffffff"; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x,p.y,7.0,0,Math.PI*2); ctx.strokeStyle=strokeColor; ctx.lineWidth=0.8; ctx.stroke();
      }
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [progress, tilt]);

  return (
    <div className="w-full h-full relative flex items-center justify-center pointer-events-none select-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
