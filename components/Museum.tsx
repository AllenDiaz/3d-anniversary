'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';

export default function Museum() {
  return (
    <div className="w-full h-screen">
      <Canvas shadows>
        <Suspense fallback={null}>
          {/* Camera */}
          <PerspectiveCamera makeDefault position={[0, 1.6, 5]} fov={75} />
          
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-5, 5, -5]} intensity={0.5} />
          
          {/* Controls */}
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={2}
            maxDistance={20}
            maxPolarAngle={Math.PI / 2}
          />
          
          {/* Floor */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          
          {/* Temporary Box for testing */}
          <mesh position={[0, 1, 0]} castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#ff69b4" />
          </mesh>
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
