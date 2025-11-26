'use client';

import { useState } from 'react';
import { Text } from '@react-three/drei';
import { DoubleSide } from 'three';

interface DoorProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  doorWidth?: number;
  doorHeight?: number;
  frameColor?: string;
  portalColor?: string;
  label?: string;
  labelColor?: string;
}

export default function Door({
  position,
  rotation = [0, 0, 0],
  doorWidth = 1.2,
  doorHeight = 2.5,
  frameColor = '#8b4513',
  portalColor = '#000000',
  label = '',
  labelColor = '#ffffff',
}: DoorProps) {
  const [isHovered, setIsHovered] = useState(false);
  const frameThickness = 0.15;
  const frameDepth = 0.2;

  return (
    <group position={position} rotation={rotation}>
      {/* Door Frame - Left */}
      <mesh 
        position={[-doorWidth / 2 - frameThickness / 2, doorHeight / 2, 0]}
        castShadow
      >
        <boxGeometry args={[frameThickness, doorHeight + frameThickness, frameDepth]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>

      {/* Door Frame - Right */}
      <mesh 
        position={[doorWidth / 2 + frameThickness / 2, doorHeight / 2, 0]}
        castShadow
      >
        <boxGeometry args={[frameThickness, doorHeight + frameThickness, frameDepth]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>

      {/* Door Frame - Top */}
      <mesh 
        position={[0, doorHeight + frameThickness / 2, 0]}
        castShadow
      >
        <boxGeometry args={[doorWidth + frameThickness * 2, frameThickness, frameDepth]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>

      {/* Portal/Opening Effect */}
      <mesh
        position={[0, doorHeight / 2, 0]}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <planeGeometry args={[doorWidth, doorHeight]} />
        <meshStandardMaterial
          color={isHovered ? portalColor : '#1a1a1a'}
          transparent
          opacity={isHovered ? 0.3 : 0.6}
          side={DoubleSide}
          emissive={isHovered ? portalColor : '#000000'}
          emissiveIntensity={isHovered ? 0.4 : 0}
        />
      </mesh>

      {/* Door Label/Sign */}
      {label && (
        <>
          {/* Sign Background */}
          <mesh position={[0, doorHeight + 0.5, 0.11]}>
            <planeGeometry args={[doorWidth * 0.8, 0.4]} />
            <meshStandardMaterial color="#2a2a2a" />
          </mesh>
          
          {/* Text Label */}
          <Text
            position={[0, doorHeight + 0.5, 0.12]}
            fontSize={0.2}
            color={labelColor}
            anchorX="center"
            anchorY="middle"
          >
            {label}
          </Text>
        </>
      )}

      {/* Decorative arch detail */}
      <mesh position={[0, doorHeight + frameThickness, 0]}>
        <boxGeometry args={[doorWidth + frameThickness * 2, 0.05, frameDepth]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}
