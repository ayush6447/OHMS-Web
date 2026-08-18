import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Particle {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  radius: number;
  color: string;
  type: 'LDL' | 'HDL' | 'TRI';
  opacity: number;
  pulseState: number;
  noiseSeed: number;
}

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setReducedMotion(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    } catch (e) {
      setWebglSupported(false);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const handleResize = () => {
      if (!containerRef.current || !renderer) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouse.targetX = (e.clientX / innerWidth - 0.5) * 4;
      mouse.targetY = -(e.clientY / innerHeight - 0.5) * 4;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Generate Particles with Pastel Green Tones (#80EF80, #A2F5A2, #5CB85C)
    const count = 75;
    const particles: Particle[] = [];
    const greenColors = ['#80EF80', '#A2F5A2', '#5CB85C'];

    for (let i = 0; i < count; i++) {
      const type = i % 3 === 0 ? 'LDL' : i % 3 === 1 ? 'HDL' : 'TRI';
      const radius = type === 'LDL' ? 0.65 : type === 'TRI' ? 0.45 : 0.3;
      const color = greenColors[i % greenColors.length];
      
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 24;
      const z = (Math.random() - 0.5) * 20;

      particles.push({
        x, y, z,
        baseX: x,
        baseY: y,
        baseZ: z,
        radius,
        color,
        type,
        opacity: 0.35 + Math.random() * 0.45,
        pulseState: 0,
        noiseSeed: Math.random() * 100,
      });
    }

    const group = new THREE.Group();
    scene.add(group);

    const sphereGeo = new THREE.SphereGeometry(1, 24, 24);
    const particleMeshes: THREE.Mesh[] = [];
    const particleRings: THREE.Mesh[] = [];

    const ringGeo = new THREE.RingGeometry(0.8, 1.0, 32);

    particles.forEach((p) => {
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(p.color),
        transparent: true,
        opacity: p.opacity,
      });
      const mesh = new THREE.Mesh(sphereGeo, mat);
      mesh.position.set(p.x, p.y, p.z);
      mesh.scale.set(p.radius, p.radius, p.radius);
      group.add(mesh);
      particleMeshes.push(mesh);

      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#80EF80'),
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.set(p.x, p.y, p.z);
      group.add(ringMesh);
      particleRings.push(ringMesh);
    });

    // Pastel Green Sweeping Laser Beam Plane
    const beamGeo = new THREE.PlaneGeometry(0.8, 35);
    const beamMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#80EF80'),
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    });
    const beamMesh = new THREE.Mesh(beamGeo, beamMat);
    beamMesh.rotation.z = Math.PI / 12;
    scene.add(beamMesh);

    const beamGlowGeo = new THREE.PlaneGeometry(3.5, 35);
    const beamGlowMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#80EF80'),
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
    });
    const beamGlowMesh = new THREE.Mesh(beamGlowGeo, beamGlowMat);
    beamGlowMesh.rotation.z = Math.PI / 12;
    scene.add(beamGlowMesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      group.position.x = mouse.x;
      group.position.y = mouse.y;

      const sweepX = Math.sin(elapsedTime * 0.6) * 18;
      beamMesh.position.x = sweepX;
      beamGlowMesh.position.x = sweepX;

      particles.forEach((p, idx) => {
        p.noiseSeed += 0.005;
        p.x = p.baseX + Math.sin(p.noiseSeed) * 0.8;
        p.y = p.baseY + Math.cos(p.noiseSeed * 1.3) * 0.8;
        
        const mesh = particleMeshes[idx];
        const ring = particleRings[idx];
        mesh.position.set(p.x, p.y, p.z);
        ring.position.set(p.x, p.y, p.z);

        const distToBeam = Math.abs(p.x - sweepX);
        if (distToBeam < 1.5) {
          p.pulseState = Math.min(p.pulseState + 0.1, 1);
        } else {
          p.pulseState = Math.max(p.pulseState - 0.03, 0);
        }

        const pulseScale = p.radius * (1 + p.pulseState * 0.4);
        mesh.scale.set(pulseScale, pulseScale, pulseScale);
        
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = p.opacity + p.pulseState * 0.4;

        const ringMat = ring.material as THREE.MeshBasicMaterial;
        if (p.pulseState > 0.1) {
          ringMat.opacity = (1 - p.pulseState) * 0.6;
          const ringScale = (1.2 + (1 - p.pulseState) * 1.5) * p.radius;
          ring.scale.set(ringScale, ringScale, ringScale);
        } else {
          ringMat.opacity = 0;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
    };
  }, []);

  if (reducedMotion || !webglSupported) {
    return (
      <div className="absolute inset-0 z-0 bg-white dark:bg-[#0A0A0A] opacity-90 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#80EF80]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#80EF80]/10 rounded-full blur-3xl" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block opacity-85" />
      
      {/* Soft gradient contrast overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent dark:from-[#0A0A0A]/95 dark:via-[#0A0A0A]/70 dark:to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white dark:from-[#0A0A0A]/50 dark:via-transparent dark:to-[#0A0A0A] pointer-events-none" />
    </div>
  );
};
