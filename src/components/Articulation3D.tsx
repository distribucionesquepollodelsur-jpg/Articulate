import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Articulation3DProps {
  sound: any;
  active?: boolean;
}

export const Articulation3D: React.FC<Articulation3DProps> = ({ sound, active }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const tongueRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(400, 400);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Abstract Head/Mouth Geometry
    const headGeo = new THREE.TorusGeometry(3, 0.1, 16, 100, Math.PI);
    const headMat = new THREE.MeshPhongMaterial({ color: 0x1A1A1A, transparent: true, opacity: 0.1 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.rotation.x = Math.PI / 2;
    scene.add(head);

    // Tongue Logic
    const tongueGeo = new THREE.CapsuleGeometry(1, 2, 4, 8);
    const tongueMat = new THREE.MeshPhongMaterial({ color: 0xFF4D4D, emissive: 0x330000 });
    const tongue = new THREE.Mesh(tongueGeo, tongueMat);
    tongue.rotation.z = Math.PI / 2;
    scene.add(tongue);
    tongueRef.current = tongue;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const animate = () => {
      requestAnimationFrame(animate);
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    return () => {
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  useEffect(() => {
    if (!tongueRef.current || !sound) return;

    // Animate tongue based on "Place of Articulation"
    const targetY = sound.place === 'Front' ? 1 : sound.place === 'Back' ? -1 : 0;
    const targetX = sound.mouth === 'Close' ? 1.5 : sound.mouth === 'Open' ? 0 : 0.7;

    const duration = 500;
    const start = Date.now();
    const startY = tongueRef.current.position.y;
    const startX = tongueRef.current.position.x;

    const update = () => {
      const elap = Date.now() - start;
      const t = Math.min(elap / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      
      if (tongueRef.current) {
        tongueRef.current.position.y = startY + (targetY - startY) * ease;
        tongueRef.current.position.x = startX + (targetX - startX) * ease;
        
        // Intensity scaling if active
        if (active) {
            tongueRef.current.scale.setScalar(1 + Math.sin(Date.now() * 0.01) * 0.1);
        }
      }

      if (t < 1) requestAnimationFrame(update);
    };
    update();
  }, [sound, active]);

  return (
    <div className="relative w-full aspect-square bg-brand-primary/5 rounded-[48px] overflow-hidden group">
      <div ref={containerRef} className="w-full h-full flex items-center justify-center" />
      <div className="absolute inset-x-0 bottom-8 text-center">
        <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-[10px] font-mono tracking-widest uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity">
          3D Articulation Model
        </span>
      </div>
    </div>
  );
};
