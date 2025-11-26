'use client';

import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { Suspense, useState } from 'react';
import Room from './Room';
import Lighting from './Lighting';
import CameraControls from './CameraControls';
import PhotoFrame from './PhotoFrame';

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
          
          {/* Photo Frames - Main Gallery */}
          <PhotoFrame 
            position={[-5.99, 2, 2]} 
            rotation={[0, Math.PI / 2, 0]}
            frameStyle="classic"
            frameColor="#5c4033"
            caption="Our First Meeting"
            date="January 2024"
          />
          <PhotoFrame 
            position={[-5.99, 2, -2]} 
            rotation={[0, Math.PI / 2, 0]}
            frameStyle="ornate"
            frameColor="#8b4513"
            caption="Coffee Date"
            date="February 2024"
            frameWidth={1.0}
            frameHeight={1.3}
          />
          
          <PhotoFrame 
            position={[5.99, 2, 2]} 
            rotation={[0, -Math.PI / 2, 0]}
            frameStyle="modern"
            frameColor="#2c2c2c"
            caption="Beach Adventure"
            date="March 2024"
          />
          <PhotoFrame 
            position={[5.99, 2, -2]} 
            rotation={[0, -Math.PI / 2, 0]}
            frameStyle="classic"
            frameColor="#654321"
            caption="Sunset Together"
            date="April 2024"
            frameWidth={1.4}
            frameHeight={1.1}
          />
          
          {/* Photo Frames - First Date Room */}
          <PhotoFrame 
            position={[-13.99, 2, 0]} 
            rotation={[0, Math.PI / 2, 0]}
            frameStyle="ornate"
            frameColor="#cd7f32"
            caption="The Moment I Knew"
            date="Valentine's Day"
            frameWidth={1.5}
            frameHeight={1.8}
          />
          
          {/* Photo Frames - Adventures Room */}
          <PhotoFrame 
            position={[13.99, 2, 0]} 
            rotation={[0, -Math.PI / 2, 0]}
            frameStyle="modern"
            frameColor="#4a4a4a"
            caption="Mountain Hike"
            date="Summer 2024"
          />
          
          {/* Photo Frames - Special Moments Room */}
          <PhotoFrame 
            position={[0, 2, -15.49]} 
            rotation={[0, 0, 0]}
            frameStyle="ornate"
            frameColor="#d4af37"
            caption="Forever & Always"
            date="Our Anniversary"
            frameWidth={1.6}
            frameHeight={2.0}
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
            doors={[
              { position: [-6, 0, 0], rotation: [0, Math.PI / 2, 0], label: '💕 First Date' },
              { position: [6, 0, 0], rotation: [0, -Math.PI / 2, 0], label: '🌍 Adventures' },
              { position: [0, 0, -7.5], rotation: [0, 0, 0], label: '✨ Special Moments' },
            ]}
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
            doors={[
              { position: [4, 0, 0], rotation: [0, -Math.PI / 2, 0], label: '← Main Gallery' },
            ]}
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
            doors={[
              { position: [-4, 0, 0], rotation: [0, Math.PI / 2, 0], label: '← Main Gallery' },
            ]}
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
            doors={[
              { position: [0, 0, 4], rotation: [0, Math.PI, 0], label: '← Main Gallery' },
            ]}
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
