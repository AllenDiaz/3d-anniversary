'use client';

import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { Suspense, useState } from 'react';
import Room from './Room';
import Lighting from './Lighting';
import CameraControls from './CameraControls';

export default function Museum() {
  const [controlMode, setControlMode] = useState<'orbit' | 'firstPerson'>('orbit');

  return (
    <div className="w-full h-screen">
      <Canvas shadows>
        <Suspense fallback={null}>
          {/* Camera */}
          <PerspectiveCamera makeDefault position={[0, 1.6, 5]} fov={75} />
          
          {/* Lighting System */}
          <Lighting />
          
          {/* Camera Controls */}
          <CameraControls mode={controlMode} />
          
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
      
      {/* Camera Mode Toggle */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={() => setControlMode('orbit')}
          className={`px-4 py-2 rounded transition-colors ${
            controlMode === 'orbit'
              ? 'bg-pink-500 text-white'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          🔄 Orbit View
        </button>
        <button
          onClick={() => setControlMode('firstPerson')}
          className={`px-4 py-2 rounded transition-colors ${
            controlMode === 'firstPerson'
              ? 'bg-pink-500 text-white'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          🚶 Walk Mode
        </button>
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-4 text-white bg-black/50 px-4 py-2 rounded">
        {controlMode === 'orbit' ? (
          <>
            <p className="text-sm">🖱️ Mouse: Look around</p>
            <p className="text-sm">🎯 Scroll: Zoom in/out</p>
            <p className="text-sm">📌 Drag: Rotate view</p>
          </>
        ) : (
          <>
            <p className="text-sm">🖱️ Click to lock cursor</p>
            <p className="text-sm">⌨️ WASD / Arrow Keys: Move</p>
            <p className="text-sm">👀 Mouse: Look around</p>
            <p className="text-sm">ESC: Exit pointer lock</p>
          </>
        )}
      </div>
    </div>
  );
}
