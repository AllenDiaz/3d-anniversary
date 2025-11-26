'use client';

import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';
import Room from './Room';
import Lighting from './Lighting';
import CameraControls from './CameraControls';
import PhotoFrame from './PhotoFrame';
import { useMemories } from '@/hooks/useMemories';
import { Memory } from '@/types/memory';
import { 
  DecorativePlant, 
  Pedestal, 
  HeartDecor, 
  Bench, 
  WallText, 
  FloatingHeart, 
  Table, 
  RoomSign 
} from './RoomDecor';
import ExhibitDescription from './ExhibitDescription';

type RoomName = 'main' | 'firstDate' | 'adventures' | 'specialMoments';

const ROOM_POSITIONS: Record<RoomName, { camera: [number, number, number]; lookAt: [number, number, number] }> = {
  main: { camera: [0, 1.6, 5], lookAt: [0, 1, 0] },
  firstDate: { camera: [-10, 1.6, 4], lookAt: [-10, 1, 0] },
  adventures: { camera: [10, 1.6, 4], lookAt: [10, 1, 0] },
  specialMoments: { camera: [0, 1.6, -7.5], lookAt: [0, 1, -11.5] },
};

export default function Museum() {
  const { getMemoriesByRoom, getStoryByMemoryId } = useMemories();
  const [controlMode, setControlMode] = useState<'orbit' | 'firstPerson'>('orbit');
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [notification, setNotification] = useState<string>('');
  const [currentRoom, setCurrentRoom] = useState<RoomName>('main');
  const [cameraTarget, setCameraTarget] = useState<[number, number, number]>([0, 1.6, 5]);
  const [lookAtTarget, setLookAtTarget] = useState<[number, number, number]>([0, 1, 0]);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 2000);
  };

  const navigateToRoom = (room: RoomName) => {
    setCurrentRoom(room);
    setCameraTarget(ROOM_POSITIONS[room].camera);
    setLookAtTarget(ROOM_POSITIONS[room].lookAt);
    playClickSound();
    
    const roomNames: Record<RoomName, string> = {
      main: 'Main Gallery',
      firstDate: 'First Date Room',
      adventures: 'Adventures Room',
      specialMoments: 'Special Moments Room',
    };
    showNotification(`Entering ${roomNames[room]}...`);
  };

  // ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedMemory) {
        setSelectedMemory(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedMemory]);

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
          <CameraControls 
            mode={controlMode} 
            targetPosition={cameraTarget}
            targetLookAt={lookAtTarget}
          />
          
          {/* Photo Frames - Data Driven with Descriptions */}
          {getMemoriesByRoom('main').map((memory) => {
            // Calculate description position based on frame position
            const isLeftWall = memory.position[0] < -5;
            const isRightWall = memory.position[0] > 5;
            const descOffset = isLeftWall ? [0.7, -0.8, 0] : isRightWall ? [-0.7, -0.8, 0] : [0, -1.2, 0];
            
            return (
              <group key={memory.id}>
                <PhotoFrame
                  position={memory.position}
                  rotation={memory.rotation}
                  frameStyle={memory.frameStyle}
                  caption={memory.title}
                  date={memory.date}
                  frameWidth={memory.size.width}
                  frameHeight={memory.size.height}
                  onClick={() => {
                    setSelectedMemory(memory);
                    playClickSound();
                    showNotification(`Opening ${memory.title}...`);
                  }}
                />
                <ExhibitDescription
                  position={[
                    memory.position[0] + descOffset[0] as number,
                    memory.position[1] + descOffset[1] as number,
                    memory.position[2] + descOffset[2] as number
                  ]}
                  rotation={memory.rotation}
                  title={memory.title}
                  description={memory.description}
                  date={memory.date}
                  location={memory.location}
                  tags={memory.tags?.slice(0, 3)}
                  width={memory.size.width}
                />
              </group>
            );
          })}
          
          {getMemoriesByRoom('firstDate').map((memory) => {
            // Calculate description position for First Date room
            const isWestWall = memory.position[0] < -13;
            const isNorthWall = memory.position[2] < -2;
            const isSouthWall = memory.position[2] > 2;
            const descOffset = isWestWall ? [0.7, -0.8, 0] : isNorthWall ? [0, -1, 0.5] : isSouthWall ? [0, -1, -0.5] : [0, -1.2, 0];
            
            return (
              <group key={memory.id}>
                <PhotoFrame
                  position={memory.position}
                  rotation={memory.rotation}
                  frameStyle={memory.frameStyle}
                  caption={memory.title}
                  date={memory.date}
                  frameWidth={memory.size.width}
                  frameHeight={memory.size.height}
                  onClick={() => {
                    setSelectedMemory(memory);
                    playClickSound();
                    showNotification(`Opening ${memory.title}...`);
                  }}
                />
                <ExhibitDescription
                  position={[
                    memory.position[0] + descOffset[0] as number,
                    memory.position[1] + descOffset[1] as number,
                    memory.position[2] + descOffset[2] as number
                  ]}
                  rotation={memory.rotation}
                  title={memory.title}
                  description={memory.description}
                  date={memory.date}
                  location={memory.location}
                  tags={memory.tags?.slice(0, 3)}
                  width={memory.size.width}
                  backgroundColor="#2d1f1f"
                  textColor="#ffb3d9"
                />
              </group>
            );
          })}
          
          {getMemoriesByRoom('adventures').map((memory) => {
            // Calculate description position for Adventures room
            const isEastWall = memory.position[0] > 13;
            const isNorthWall = memory.position[2] < -2;
            const isSouthWall = memory.position[2] > 2;
            const descOffset = isEastWall ? [-0.7, -0.8, 0] : isNorthWall ? [0, -1, 0.5] : isSouthWall ? [0, -1, -0.5] : [0, -1.2, 0];
            
            return (
              <group key={memory.id}>
                <PhotoFrame
                  position={memory.position}
                  rotation={memory.rotation}
                  frameStyle={memory.frameStyle}
                  caption={memory.title}
                  date={memory.date}
                  frameWidth={memory.size.width}
                  frameHeight={memory.size.height}
                  onClick={() => {
                    setSelectedMemory(memory);
                    playClickSound();
                    showNotification(`Opening ${memory.title}...`);
                  }}
                />
                <ExhibitDescription
                  position={[
                    memory.position[0] + descOffset[0] as number,
                    memory.position[1] + descOffset[1] as number,
                    memory.position[2] + descOffset[2] as number
                  ]}
                  rotation={memory.rotation}
                  title={memory.title}
                  description={memory.description}
                  date={memory.date}
                  location={memory.location}
                  tags={memory.tags?.slice(0, 3)}
                  width={memory.size.width}
                  backgroundColor="#1f2d2d"
                  textColor="#b3d9ff"
                />
              </group>
            );
          })}
          
          {getMemoriesByRoom('specialMoments').map((memory) => {
            // Calculate description position for Special Moments room
            const isNorthWall = memory.position[2] < -14;
            const descOffset = isNorthWall ? [0, -1.2, 0.5] : [0, -1.2, 0];
            
            return (
              <group key={memory.id}>
                <PhotoFrame
                  position={memory.position}
                  rotation={memory.rotation}
                  frameStyle={memory.frameStyle}
                  caption={memory.title}
                  date={memory.date}
                  frameWidth={memory.size.width}
                  frameHeight={memory.size.height}
                  onClick={() => {
                    setSelectedMemory(memory);
                    playClickSound();
                    showNotification(`Opening ${memory.title}...`);
                  }}
                />
                <ExhibitDescription
                  position={[
                    memory.position[0] + descOffset[0] as number,
                    memory.position[1] + descOffset[1] as number,
                    memory.position[2] + descOffset[2] as number
                  ]}
                  rotation={memory.rotation}
                  title={memory.title}
                  description={memory.description}
                  date={memory.date}
                  location={memory.location}
                  tags={memory.tags?.slice(0, 3)}
                  width={memory.size.width}
                  backgroundColor="#2d1f2d"
                  textColor="#ffccff"
                />
              </group>
            );
          })}
          
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
              { position: [-6, 0, 0], rotation: [0, Math.PI / 2, 0], label: '💕 First Date', onClick: () => navigateToRoom('firstDate') },
              { position: [6, 0, 0], rotation: [0, -Math.PI / 2, 0], label: '🌍 Adventures', onClick: () => navigateToRoom('adventures') },
              { position: [0, 0, -7.5], rotation: [0, 0, 0], label: '✨ Special Moments', onClick: () => navigateToRoom('specialMoments') },
            ]}
          />
          
          {/* Main Gallery Decorations */}
          <RoomSign 
            position={[0, 3.2, -7.4]} 
            rotation={[0, 0, 0]}
            title="Our Love Story"
            subtitle="A Journey Through Time"
            emoji="🏛️"
          />
          <Pedestal position={[-4, 0, 4]} height={1.2} />
          <Pedestal position={[4, 0, 4]} height={1.2} />
          <DecorativePlant position={[-5.5, 0, 6]} scale={1.2} />
          <DecorativePlant position={[5.5, 0, 6]} scale={1.2} />
          <Bench position={[0, 0, 6]} rotation={[0, Math.PI, 0]} color="#654321" />
          <WallText 
            position={[0, 3.5, 7.4]}
            rotation={[0, Math.PI, 0]}
            text="Welcome to Our Virtual Love Museum"
            fontSize={0.25}
            color="#d4af37"
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
              { position: [4, 0, 0], rotation: [0, -Math.PI / 2, 0], label: '← Main Gallery', onClick: () => navigateToRoom('main') },
            ]}
          />
          
          {/* First Date Room Decorations */}
          <RoomSign 
            position={[-10, 3, -3.9]}
            rotation={[0, 0, 0]}
            title="First Date"
            subtitle="Where It All Began"
            emoji="💕"
          />
          <Table position={[-12, 0, 2]} rotation={[0, Math.PI / 4, 0]} color="#8b4513" />
          <HeartDecor position={[-12, 0.6, 2]} scale={0.2} color="#ff69b4" />
          <Table position={[-12, 0, -2]} rotation={[0, -Math.PI / 4, 0]} color="#8b4513" />
          <HeartDecor position={[-12, 0.6, -2]} scale={0.2} color="#ff1493" />
          <FloatingHeart position={[-8.5, 2.5, 2]} color="#ff69b4" />
          <FloatingHeart position={[-8.5, 2.8, -2]} color="#ff1493" />
          <FloatingHeart position={[-10, 3, 0]} color="#ffb3d9" />
          <DecorativePlant position={[-8.5, 0, 3.5]} scale={0.8} color="#ff69b4" />
          <DecorativePlant position={[-8.5, 0, -3.5]} scale={0.8} color="#ff69b4" />
          <WallText
            position={[-10, 2.8, 3.9]}
            rotation={[0, Math.PI, 0]}
            text="'The best thing to hold onto in life is each other'"
            fontSize={0.15}
            color="#ff69b4"
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
              { position: [-4, 0, 0], rotation: [0, Math.PI / 2, 0], label: '← Main Gallery', onClick: () => navigateToRoom('main') },
            ]}
          />
          
          {/* Adventures Room Decorations */}
          <RoomSign 
            position={[10, 3, -3.9]}
            rotation={[0, 0, 0]}
            title="Adventures"
            subtitle="Exploring the World Together"
            emoji="🌍"
          />
          <Bench position={[8.5, 0, 0]} rotation={[0, Math.PI / 2, 0]} color="#4a4a4a" />
          <Pedestal position={[12, 0, 2.5]} height={0.8} color="#4da6ff" topColor="#2c2c2c" />
          <Pedestal position={[12, 0, -2.5]} height={0.8} color="#4da6ff" topColor="#2c2c2c" />
          <WallText
            position={[10, 1.2, -3.85]}
            rotation={[0, 0, 0]}
            text="🏔️"
            fontSize={0.5}
            color="#4da6ff"
          />
          <WallText
            position={[10, 2.8, 3.9]}
            rotation={[0, Math.PI, 0]}
            text="'Adventure is worthwhile in itself'"
            fontSize={0.15}
            color="#4da6ff"
          />
          <DecorativePlant position={[8.5, 0, 3.5]} scale={1} color="#2d5016" />
          <DecorativePlant position={[8.5, 0, -3.5]} scale={1} color="#2d5016" />
          
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
              { position: [0, 0, 4], rotation: [0, Math.PI, 0], label: '← Main Gallery', onClick: () => navigateToRoom('main') },
            ]}
          />
          
          {/* Special Moments Room Decorations */}
          <RoomSign 
            position={[0, 3.4, -15.4]}
            rotation={[0, 0, 0]}
            title="Special Moments"
            subtitle="Forever & Always"
            emoji="✨"
          />
          <Pedestal position={[-3, 0, -14]} height={1.5} color="#d4af37" />
          <HeartDecor position={[-3, 1.8, -14]} scale={0.3} color="#ff99cc" emissive="#ff1493" />
          <Pedestal position={[3, 0, -14]} height={1.5} color="#d4af37" />
          <HeartDecor position={[3, 1.8, -14]} scale={0.3} color="#ffb3d9" emissive="#ff69b4" />
          <FloatingHeart position={[-2, 3, -11.5]} color="#ff99cc" />
          <FloatingHeart position={[2, 3, -11.5]} color="#ffb3d9" />
          <FloatingHeart position={[0, 3.2, -13]} color="#ffccff" />
          <Bench position={[0, 0, -9]} rotation={[0, Math.PI, 0]} color="#8b4513" />
          <DecorativePlant position={[-4.5, 0, -11.5]} scale={1} color="#ff69b4" />
          <DecorativePlant position={[4.5, 0, -11.5]} scale={1} color="#ff69b4" />
          <WallText
            position={[0, 3, -7.6]}
            rotation={[0, Math.PI, 0]}
            text="'In all the world, there is no heart for me like yours'"
            fontSize={0.15}
            color="#ff99cc"
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

      {/* Room Navigation Minimap */}
      <div className="absolute top-20 left-4 bg-black/60 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg">
        <div className="text-white text-sm font-semibold mb-2">📍 Current Room</div>
        <div className="grid grid-cols-2 gap-2 max-w-xs">
          <button
            onClick={() => navigateToRoom('main')}
            className={`px-3 py-2 text-xs rounded transition-all ${
              currentRoom === 'main'
                ? 'bg-pink-500 text-white shadow-lg scale-105'
                : 'bg-white/20 text-white/70 hover:bg-white/30'
            }`}
          >
            🏛️ Main Gallery
          </button>
          <button
            onClick={() => navigateToRoom('firstDate')}
            className={`px-3 py-2 text-xs rounded transition-all ${
              currentRoom === 'firstDate'
                ? 'bg-pink-500 text-white shadow-lg scale-105'
                : 'bg-white/20 text-white/70 hover:bg-white/30'
            }`}
          >
            💕 First Date
          </button>
          <button
            onClick={() => navigateToRoom('adventures')}
            className={`px-3 py-2 text-xs rounded transition-all ${
              currentRoom === 'adventures'
                ? 'bg-pink-500 text-white shadow-lg scale-105'
                : 'bg-white/20 text-white/70 hover:bg-white/30'
            }`}
          >
            🌍 Adventures
          </button>
          <button
            onClick={() => navigateToRoom('specialMoments')}
            className={`px-3 py-2 text-xs rounded transition-all ${
              currentRoom === 'specialMoments'
                ? 'bg-pink-500 text-white shadow-lg scale-105'
                : 'bg-white/20 text-white/70 hover:bg-white/30'
            }`}
          >
            ✨ Special Moments
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="absolute top-20 right-4 bg-pink-500 text-white px-6 py-3 rounded-lg shadow-lg animate-in slide-in-from-right duration-300">
          {notification}
        </div>
      )}
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-4 text-white bg-black/50 px-4 py-2 rounded max-w-xs">
        {controlMode === 'orbit' ? (
          <>
            <p className="text-sm">🖱️ Mouse: Look around</p>
            <p className="text-sm">🎯 Scroll: Zoom in/out</p>
            <p className="text-sm">📌 Drag: Rotate view</p>
            <p className="text-sm">🖼️ Click frames to enlarge</p>
            <p className="text-sm">🚪 Click doors or use minimap to navigate</p>
          </>
        ) : (
          <>
            <p className="text-sm">🖱️ Click to lock cursor</p>
            <p className="text-sm">⌨️ WASD / Arrow Keys: Move</p>
            <p className="text-sm">👀 Mouse: Look around</p>
            <p className="text-sm">ESC: Exit pointer lock</p>
            <p className="text-sm">🖼️ Click frames to enlarge</p>
            <p className="text-sm">🚪 Walk through doors or use minimap</p>
          </>
        )}
      </div>

      {/* Memory Modal with Story */}
      {selectedMemory && (() => {
        const story = getStoryByMemoryId(selectedMemory.id);
        return (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-300 p-4"
            onClick={() => setSelectedMemory(null)}
          >
            <div 
              className="relative max-w-4xl max-h-[90vh] overflow-y-auto animate-in zoom-in duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute -top-12 right-0 text-white hover:text-pink-400 transition-colors text-4xl font-light z-10"
                aria-label="Close"
              >
                ×
              </button>

              {/* Memory container */}
              <div className="bg-gradient-to-br from-amber-900 to-amber-950 p-6 rounded-lg shadow-2xl">
                {/* Photo */}
                <div className="bg-cream p-4 mb-4">
                  <div className="relative bg-gradient-to-br from-pink-200 via-pink-100 to-pink-50 aspect-[4/3] w-full flex items-center justify-center shadow-inner">
                    <div className="text-8xl">💕</div>
                  </div>
                </div>
                
                {/* Memory Details */}
                <div className="bg-zinc-900 p-6 rounded">
                  <h2 className="text-3xl font-bold text-amber-400 mb-2">
                    {selectedMemory.title}
                  </h2>
                  <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                    <span>📅 {selectedMemory.date}</span>
                    {selectedMemory.location && <span>📍 {selectedMemory.location}</span>}
                    {selectedMemory.emotion && <span>💭 {selectedMemory.emotion}</span>}
                  </div>
                  <p className="text-gray-300 mb-4 text-lg">
                    {selectedMemory.description}
                  </p>
                  
                  {selectedMemory.tags && selectedMemory.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedMemory.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-pink-900/30 text-pink-300 rounded-full text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Story Content */}
                  {story && (
                    <div className="mt-6 pt-6 border-t border-gray-700">
                      <h3 className="text-xl font-semibold text-amber-300 mb-3 flex items-center gap-2">
                        📖 {story.title}
                      </h3>
                      <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                        {story.content}
                      </div>
                      {story.mood && (
                        <div className="mt-4 text-sm text-gray-500 italic">
                          Mood: {story.mood}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Helper text */}
              <p className="text-center text-white/60 mt-4 text-sm">
                Click outside or press ESC to close
              </p>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
