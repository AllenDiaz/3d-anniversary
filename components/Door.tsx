'use client';

import { useState, useRef, useEffect } from 'react';
import { Text } from '@react-three/drei';
import { DoubleSide } from 'three';
import * as THREE from 'three';
import gsap from 'gsap';

interface DoorProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  doorWidth?: number;
  doorHeight?: number;
  frameColor?: string;
  portalColor?: string;
  label?: string;
  labelColor?: string;
  onClick?: () => void;
  info?: string;
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
  onClick,
  info,
}: DoorProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const portalRef = useRef<THREE.Mesh>(null);
  const frameThickness = 0.15;
  const frameDepth = 0.2;

  // GSAP animations for hover
  useEffect(() => {
    if (!groupRef.current || !portalRef.current) return;

    if (isHovered) {
      // Subtle scale animation
      gsap.to(groupRef.current.scale, {
        x: 1.02,
        y: 1.02,
        z: 1.02,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Portal glow animation
      if (portalRef.current.material && 'emissiveIntensity' in portalRef.current.material) {
        gsap.to(portalRef.current.material, {
          emissiveIntensity: 0.5,
          duration: 0.3,
        });
      }
    } else {
      gsap.to(groupRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.3,
        ease: 'power2.inOut',
      });

      if (portalRef.current.material && 'emissiveIntensity' in portalRef.current.material) {
        gsap.to(portalRef.current.material, {
          emissiveIntensity: 0,
          duration: 0.3,
        });
      }
    }
  }, [isHovered]);

  // Click ripple effect
  useEffect(() => {
    if (isClicked && portalRef.current) {
      const material = portalRef.current.material as THREE.MeshStandardMaterial;
      gsap.to(material, {
        emissiveIntensity: 1,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });
    }
  }, [isClicked]);

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
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
        ref={portalRef}
        position={[0, doorHeight / 2, 0]}
        onPointerEnter={(e) => {
          setIsHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={(e) => {
          setIsHovered(false);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          setIsClicked(true);
          setTimeout(() => setIsClicked(false), 300);
          if (onClick) {
            onClick();
          }
        }}
      >
        <planeGeometry args={[doorWidth, doorHeight]} />
        <meshStandardMaterial
          color={isClicked ? '#4a4a4a' : isHovered ? portalColor : '#1a1a1a'}
          transparent
          opacity={isHovered ? 0.3 : 0.6}
          side={DoubleSide}
          emissive={isClicked ? '#ffffff' : isHovered ? portalColor : '#000000'}
          emissiveIntensity={isClicked ? 0.8 : isHovered ? 0.4 : 0}
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
