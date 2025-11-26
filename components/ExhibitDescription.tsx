'use client';

import { Text } from '@react-three/drei';
import { useState } from 'react';

interface ExhibitDescriptionProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  title: string;
  description: string;
  date?: string;
  location?: string;
  tags?: string[];
  width?: number;
  textColor?: string;
  backgroundColor?: string;
}

export default function ExhibitDescription({
  position,
  rotation = [0, 0, 0],
  title,
  description,
  date,
  location,
  tags = [],
  width = 1.2,
  textColor = '#ffffff',
  backgroundColor = '#1a1a1a',
}: ExhibitDescriptionProps) {
  const [isHovered, setIsHovered] = useState(false);

  const plaqueHeight = 0.8;
  const padding = 0.05;

  return (
    <group position={position} rotation={rotation}>
      {/* Background plaque */}
      <mesh 
        position={[0, 0, -0.01]}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <planeGeometry args={[width, plaqueHeight]} />
        <meshStandardMaterial 
          color={backgroundColor} 
          metalness={0.2}
          roughness={0.8}
          emissive={isHovered ? '#333333' : '#000000'}
          emissiveIntensity={isHovered ? 0.3 : 0}
        />
      </mesh>

      {/* Gold border */}
      <mesh position={[0, 0, -0.005]}>
        <planeGeometry args={[width + 0.02, plaqueHeight + 0.02]} />
        <meshStandardMaterial 
          color="#d4af37" 
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Title */}
      <Text
        position={[0, plaqueHeight / 2 - 0.1, 0]}
        fontSize={0.08}
        color="#d4af37"
        anchorX="center"
        anchorY="top"
        maxWidth={width - padding * 2}
        fontWeight="bold"
      >
        {title}
      </Text>

      {/* Date and Location line */}
      {(date || location) && (
        <Text
          position={[0, plaqueHeight / 2 - 0.2, 0]}
          fontSize={0.05}
          color="#999999"
          anchorX="center"
          anchorY="top"
          maxWidth={width - padding * 2}
        >
          {[date, location].filter(Boolean).join(' • ')}
        </Text>
      )}

      {/* Description */}
      <Text
        position={[0, plaqueHeight / 2 - 0.3, 0]}
        fontSize={0.06}
        color={textColor}
        anchorX="center"
        anchorY="top"
        maxWidth={width - padding * 2}
        lineHeight={1.2}
        textAlign="center"
      >
        {description}
      </Text>

      {/* Tags */}
      {tags.length > 0 && (
        <Text
          position={[0, -plaqueHeight / 2 + 0.08, 0]}
          fontSize={0.045}
          color="#666666"
          anchorX="center"
          anchorY="bottom"
          maxWidth={width - padding * 2}
        >
          {tags.map(tag => `#${tag}`).join(' ')}
        </Text>
      )}
    </group>
  );
}
