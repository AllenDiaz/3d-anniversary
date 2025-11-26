'use client';

import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';
import Room from './Room';
import Lighting from './Lighting';
import CameraControls from './CameraControls';
import PhotoFrame from './PhotoFrame';

interface PhotoData {
  caption: string;
  date: string;
  imageUrl?: string;
}

export default function Museum() {
  const [controlMode, setControlMode] = useState<'orbit' | 'firstPerson'>('orbit');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoData | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [notification, setNotification] = useState<string>('');

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 2000);
  };

  // ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedPhoto) {
        setSelectedPhoto(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedPhoto]);

  const playClickSound = () => {
    if (!soundEnabled) return;
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

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
            onClick={(data) => {
              setSelectedPhoto(data);
              playClickSound();
              showNotification('Opening photo...');
            }}
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
            onClick={(data) => {
              setSelectedPhoto(data);
              playClickSound();
              showNotification('Opening photo...');
            }}
          />
          
          <PhotoFrame 
            position={[5.99, 2, 2]} 
            rotation={[0, -Math.PI / 2, 0]}
            frameStyle="modern"
            frameColor="#2c2c2c"
            caption="Beach Adventure"
            date="March 2024"
            onClick={(data) => {
              setSelectedPhoto(data);
              playClickSound();
              showNotification('Opening photo...');
            }}
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
            onClick={(data) => {
              setSelectedPhoto(data);
              playClickSound();
              showNotification('Opening photo...');
            }}
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
            onClick={(data) => {
              setSelectedPhoto(data);
              playClickSound();
              showNotification('Opening photo...');
            }}
          />
          
          {/* Photo Frames - Adventures Room */}
          <PhotoFrame 
            position={[13.99, 2, 0]} 
            rotation={[0, -Math.PI / 2, 0]}
            frameStyle="modern"
            frameColor="#4a4a4a"
            caption="Mountain Hike"
            date="Summer 2024"
            onClick={(data) => {
              setSelectedPhoto(data);
              playClickSound();
              showNotification('Opening photo...');
            }}
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
            onClick={(data) => {
              setSelectedPhoto(data);
              playClickSound();
              showNotification('Opening photo...');
            }}
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
      
      {/* Camera Mode Toggle & Sound */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={() => {
            setControlMode('orbit');
            playClickSound();
          }}
          className={`px-4 py-2 rounded transition-colors ${
            controlMode === 'orbit'
              ? 'bg-pink-500 text-white'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          🔄 Orbit View
        </button>
        <button
          onClick={() => {
            setControlMode('firstPerson');
            playClickSound();
          }}
          className={`px-4 py-2 rounded transition-colors ${
            controlMode === 'firstPerson'
              ? 'bg-pink-500 text-white'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          🚶 Walk Mode
        </button>
        <button
          onClick={() => {
            setSoundEnabled(!soundEnabled);
            playClickSound();
          }}
          className={`px-4 py-2 rounded transition-colors ${
            soundEnabled
              ? 'bg-green-500 text-white'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
          title={soundEnabled ? 'Sound On' : 'Sound Off'}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="absolute top-20 right-4 bg-pink-500 text-white px-6 py-3 rounded-lg shadow-lg animate-in slide-in-from-right duration-300">
          {notification}
        </div>
      )}
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-4 text-white bg-black/50 px-4 py-2 rounded">
        {controlMode === 'orbit' ? (
          <>
            <p className="text-sm">🖱️ Mouse: Look around</p>
            <p className="text-sm">🎯 Scroll: Zoom in/out</p>
            <p className="text-sm">📌 Drag: Rotate view</p>
            <p className="text-sm">🖼️ Click frames to enlarge</p>
          </>
        ) : (
          <>
            <p className="text-sm">🖱️ Click to lock cursor</p>
            <p className="text-sm">⌨️ WASD / Arrow Keys: Move</p>
            <p className="text-sm">👀 Mouse: Look around</p>
            <p className="text-sm">ESC: Exit pointer lock</p>
            <p className="text-sm">🖼️ Click frames to enlarge</p>
          </>
        )}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-w-5xl max-h-[90vh] animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 text-white hover:text-pink-400 transition-colors text-4xl font-light"
              aria-label="Close"
            >
              ×
            </button>

            {/* Photo container with frame effect */}
            <div className="bg-gradient-to-br from-amber-900 to-amber-950 p-8 rounded-lg shadow-2xl">
              {/* Inner mat */}
              <div className="bg-cream p-6">
                {/* Photo */}
                <div className="relative bg-gradient-to-br from-pink-200 via-pink-100 to-pink-50 aspect-[4/5] w-[600px] flex items-center justify-center shadow-inner">
                  <div className="text-9xl">💕</div>
                </div>
              </div>
              
              {/* Caption plaque */}
              <div className="mt-6 bg-zinc-900 py-3 px-6 rounded text-center">
                <h3 className="text-2xl font-semibold text-amber-400 mb-1">
                  {selectedPhoto.caption}
                </h3>
                <p className="text-gray-400 text-sm">
                  {selectedPhoto.date}
                </p>
              </div>
            </div>

            {/* Helper text */}
            <p className="text-center text-white/60 mt-4 text-sm">
              Click outside or press ESC to close
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
