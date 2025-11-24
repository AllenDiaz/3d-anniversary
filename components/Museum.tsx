'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import Room from './Room';
import Lighting from './Lighting';

export default function Museum() {
  return (
    <div className="w-full h-screen">
      <Canvas shadows>
        <Suspense fallback={null}>
          {/* Camera */}
          <PerspectiveCamera makeDefault position={[0, 1.6, 5]} fov={75} />
          
          {/* Lighting System */}
          <Lighting />
          
          {/* Controls */}
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={2}
            maxDistance={20}
            maxPolarAngle={Math.PI / 2}
          />
          
          {/* Main Gallery Room */}
          <Room 
            width={12}
            height={4}
            depth={15}
            position={[0, 0, 0]}
            wallColor="#e8e8e8"
            floorColor="#2a2a2a"
            ceilingColor="#ffffff"
            tilePattern="checkerboard"
            tileColor1="#f5f5f5"
            tileColor2="#e0e0e0"
          />
          
          {/* First Date Room - Left */}
          <Room 
            width={8}
            height={3.5}
            depth={8}
            position={[-10, 0, 0]}
            wallColor="#ffe4e1"
            floorColor="#3a2a2a"
            ceilingColor="#fff5f5"
            tilePattern="marble"
            tileColor1="#ffe4e1"
            tileColor2="#ffc0cb"
          />
          
          {/* Adventures Room - Right */}
          <Room 
            width={8}
            height={3.5}
            depth={8}
            position={[10, 0, 0]}
            wallColor="#e6f3ff"
            floorColor="#2a3a3a"
            ceilingColor="#f0f8ff"
            tilePattern="checkerboard"
            tileColor1="#cce5ff"
            tileColor2="#99ccff"
          />
          
          {/* Special Moments Room - Back */}
          <Room 
            width={10}
            height={3.8}
            depth={8}
            position={[0, 0, -11.5]}
            wallColor="#fff0f5"
            floorColor="#3a2a3a"
            ceilingColor="#fff5fa"
            tilePattern="marble"
            tileColor1="#ffe6f0"
            tileColor2="#ffccdd"
          />
        </Suspense>
      </Canvas>
      
      {/* Loading indicator */}
      <div className="absolute top-4 left-4 text-white bg-black/50 px-4 py-2 rounded">
        Virtual Love Museum
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-4 text-white bg-black/50 px-4 py-2 rounded">
        <p className="text-sm">🖱️ Mouse: Look around</p>
        <p className="text-sm">🎯 Scroll: Zoom in/out</p>
      </div>
    </div>
  );
}
