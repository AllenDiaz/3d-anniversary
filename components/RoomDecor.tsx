'use client';

import { Text } from '@react-three/drei';
import { useState } from 'react';

interface DecorativePlantProps {
  position: [number, number, number];
  scale?: number;
  color?: string;
}

export function DecorativePlant({ position, scale = 1, color = '#2d5016' }: DecorativePlantProps) {
  return (
    <group position={position} scale={scale}>
      {/* Pot */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.15, 0.12, 0.3, 8]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      {/* Plant leaves */}
      <mesh position={[0, 0.4, 0]} rotation={[0, 0, 0.3]}>
        <coneGeometry args={[0.12, 0.3, 4]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.5, 0]} rotation={[0, Math.PI / 2, 0.2]}>
        <coneGeometry args={[0.1, 0.25, 4]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

interface PedestalProps {
  position: [number, number, number];
  height?: number;
  color?: string;
  topColor?: string;
}

export function Pedestal({ position, height = 1, color = '#d4af37', topColor = '#1a1a1a' }: PedestalProps) {
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.2, 16]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Column */}
      <mesh position={[0, height / 2 + 0.1, 0]}>
        <cylinderGeometry args={[0.18, 0.18, height, 12]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Top */}
      <mesh position={[0, height + 0.2, 0]}>
        <cylinderGeometry args={[0.3, 0.22, 0.1, 16]} />
        <meshStandardMaterial color={topColor} />
      </mesh>
    </group>
  );
}

interface HeartDecorProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
  emissive?: string;
}

export function HeartDecor({ 
  position, 
  rotation = [0, 0, 0], 
  scale = 0.3, 
  color = '#ff69b4',
  emissive = '#ff1493'
}: HeartDecorProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Text
        fontSize={1}
        color={color}
        anchorX="center"
        anchorY="middle"
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        💕
      </Text>
      {isHovered && (
        <pointLight position={[0, 0, 0.5]} intensity={2} color={emissive} distance={2} />
      )}
    </group>
  );
}

interface BenchProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
}

export function Bench({ position, rotation = [0, 0, 0], color = '#5c4033' }: BenchProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* Seat */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[1.2, 0.08, 0.4]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.6, -0.16]}>
        <boxGeometry args={[1.2, 0.5, 0.08]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.5, 0.15, 0.15]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.5, 0.15, 0.15]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.5, 0.15, -0.15]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.5, 0.15, -0.15]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

interface WallTextProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  text: string;
  fontSize?: number;
  color?: string;
}

export function WallText({ 
  position, 
  rotation = [0, 0, 0], 
  text, 
  fontSize = 0.3,
  color = '#333333'
}: WallTextProps) {
  return (
    <Text
      position={position}
      rotation={rotation}
      fontSize={fontSize}
      color={color}
      anchorX="center"
      anchorY="middle"
      maxWidth={3}
    >
      {text}
    </Text>
  );
}

interface FloatingHeartProps {
  position: [number, number, number];
  color?: string;
}

export function FloatingHeart({ position, color = '#ff69b4' }: FloatingHeartProps) {
  return (
    <Text
      position={position}
      fontSize={0.4}
      color={color}
      anchorX="center"
      anchorY="middle"
    >
      ❤️
    </Text>
  );
}

interface TableProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
}

export function Table({ position, rotation = [0, 0, 0], color = '#8b4513' }: TableProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* Table top */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.8, 0.05, 0.8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.35, 0.25, -0.35]}>
        <cylinderGeometry args={[0.04, 0.04, 0.5, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.35, 0.25, -0.35]}>
        <cylinderGeometry args={[0.04, 0.04, 0.5, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.35, 0.25, 0.35]}>
        <cylinderGeometry args={[0.04, 0.04, 0.5, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.35, 0.25, 0.35]}>
        <cylinderGeometry args={[0.04, 0.04, 0.5, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Table cloth (for romantic rooms) */}
      <mesh position={[0, 0.53, 0]}>
        <boxGeometry args={[0.82, 0.01, 0.82]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

interface RoomSignProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  title: string;
  subtitle?: string;
  emoji?: string;
}

export function RoomSign({ 
  position, 
  rotation = [0, 0, 0], 
  title, 
  subtitle,
  emoji 
}: RoomSignProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* Sign background */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[2, 0.6]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Gold border */}
      <mesh position={[0, 0, -0.005]}>
        <planeGeometry args={[2.1, 0.65]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Title */}
      <Text
        position={[0, 0.1, 0]}
        fontSize={0.2}
        color="#d4af37"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {emoji ? `${emoji} ${title}` : title}
      </Text>
      {/* Subtitle */}
      {subtitle && (
        <Text
          position={[0, -0.1, 0]}
          fontSize={0.12}
          color="#cccccc"
          anchorX="center"
          anchorY="middle"
        >
          {subtitle}
        </Text>
      )}
    </group>
  );
}
