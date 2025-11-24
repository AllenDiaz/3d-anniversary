'use client';

import { DoubleSide } from 'three';

interface RoomProps {
  width?: number;
  height?: number;
  depth?: number;
  position?: [number, number, number];
  wallColor?: string;
  floorColor?: string;
  ceilingColor?: string;
}

export default function Room({
  width = 10,
  height = 4,
  depth = 10,
  position = [0, 0, 0],
  wallColor = '#f5f5f5',
  floorColor = '#2a2a2a',
  ceilingColor = '#ffffff',
}: RoomProps) {
  const [x, y, z] = position;
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const halfDepth = depth / 2;

  return (
    <group position={[x, y, z]}>
      {/* Floor */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]} 
        receiveShadow
      >
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color={floorColor} />
      </mesh>

      {/* Ceiling */}
      <mesh 
        rotation={[Math.PI / 2, 0, 0]} 
        position={[0, height, 0]} 
        receiveShadow
      >
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color={ceilingColor} side={DoubleSide} />
      </mesh>

      {/* Back Wall */}
      <mesh 
        position={[0, halfHeight, -halfDepth]} 
        castShadow 
        receiveShadow
      >
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color={wallColor} side={DoubleSide} />
      </mesh>

      {/* Front Wall (with opening for entry) */}
      <mesh 
        position={[0, halfHeight, halfDepth]} 
        rotation={[0, Math.PI, 0]}
        castShadow 
        receiveShadow
      >
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color={wallColor} side={DoubleSide} />
      </mesh>

      {/* Left Wall */}
      <mesh 
        position={[-halfWidth, halfHeight, 0]} 
        rotation={[0, Math.PI / 2, 0]}
        castShadow 
        receiveShadow
      >
        <planeGeometry args={[depth, height]} />
        <meshStandardMaterial color={wallColor} side={DoubleSide} />
      </mesh>

      {/* Right Wall */}
      <mesh 
        position={[halfWidth, halfHeight, 0]} 
        rotation={[0, -Math.PI / 2, 0]}
        castShadow 
        receiveShadow
      >
        <planeGeometry args={[depth, height]} />
        <meshStandardMaterial color={wallColor} side={DoubleSide} />
      </mesh>

      {/* Baseboard trim - decorative */}
      <mesh position={[0, 0.05, -halfDepth]}>
        <boxGeometry args={[width, 0.1, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0, 0.05, halfDepth]}>
        <boxGeometry args={[width, 0.1, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[-halfWidth, 0.05, 0]}>
        <boxGeometry args={[0.05, 0.1, depth]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[halfWidth, 0.05, 0]}>
        <boxGeometry args={[0.05, 0.1, depth]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}
