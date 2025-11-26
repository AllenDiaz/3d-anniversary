'use client';

import { useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useRef } from 'react';

interface PhotoFrameProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  imageUrl?: string;
  frameWidth?: number;
  frameHeight?: number;
  frameStyle?: 'classic' | 'modern' | 'ornate';
  frameColor?: string;
  caption?: string;
  date?: string;
}

export default function PhotoFrame({
  position,
  rotation = [0, 0, 0],
  imageUrl,
  frameWidth = 1.2,
  frameHeight = 1.6,
  frameStyle = 'classic',
  frameColor = '#8b4513',
  caption = '',
  date = '',
}: PhotoFrameProps) {
  const [isHovered, setIsHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const targetScale = isHovered ? 1.05 : 1;
  
  // Frame border thickness based on style
  const borderThickness = frameStyle === 'ornate' ? 0.08 : frameStyle === 'modern' ? 0.04 : 0.06;
  const frameDepth = 0.05;
  
  // Mat (inner border) dimensions
  const matSize = 0.06;
  const imageWidth = frameWidth - (borderThickness + matSize) * 2;
  const imageHeight = frameHeight - (borderThickness + matSize) * 2;

  // Create placeholder texture if no image provided
  const placeholderTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return null;

    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, 512, 512);
    gradient.addColorStop(0, '#ff9a9e');
    gradient.addColorStop(0.5, '#fecfef');
    gradient.addColorStop(1, '#ffdde1');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    
    // Heart icon
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 200px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('💕', 256, 256);
    
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  // Smooth hover animation
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Frame Border - Top */}
      <mesh position={[0, frameHeight / 2 + borderThickness / 2, 0]} castShadow>
        <boxGeometry args={[frameWidth + borderThickness * 2, borderThickness, frameDepth]} />
        <meshStandardMaterial 
          color={frameColor} 
          roughness={frameStyle === 'modern' ? 0.3 : 0.7}
          metalness={frameStyle === 'modern' ? 0.6 : 0.1}
        />
      </mesh>

      {/* Frame Border - Bottom */}
      <mesh position={[0, -frameHeight / 2 - borderThickness / 2, 0]} castShadow>
        <boxGeometry args={[frameWidth + borderThickness * 2, borderThickness, frameDepth]} />
        <meshStandardMaterial 
          color={frameColor} 
          roughness={frameStyle === 'modern' ? 0.3 : 0.7}
          metalness={frameStyle === 'modern' ? 0.6 : 0.1}
        />
      </mesh>

      {/* Frame Border - Left */}
      <mesh position={[-frameWidth / 2 - borderThickness / 2, 0, 0]} castShadow>
        <boxGeometry args={[borderThickness, frameHeight, frameDepth]} />
        <meshStandardMaterial 
          color={frameColor} 
          roughness={frameStyle === 'modern' ? 0.3 : 0.7}
          metalness={frameStyle === 'modern' ? 0.6 : 0.1}
        />
      </mesh>

      {/* Frame Border - Right */}
      <mesh position={[frameWidth / 2 + borderThickness / 2, 0, 0]} castShadow>
        <boxGeometry args={[borderThickness, frameHeight, frameDepth]} />
        <meshStandardMaterial 
          color={frameColor} 
          roughness={frameStyle === 'modern' ? 0.3 : 0.7}
          metalness={frameStyle === 'modern' ? 0.6 : 0.1}
        />
      </mesh>

      {/* Mat (inner border) */}
      <mesh position={[0, 0, 0.02]} castShadow>
        <boxGeometry args={[frameWidth, frameHeight, 0.01]} />
        <meshStandardMaterial color="#f5f5dc" roughness={0.9} />
      </mesh>

      {/* Photo/Image */}
      <mesh
        position={[0, 0, 0.025]}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <planeGeometry args={[imageWidth, imageHeight]} />
        <meshStandardMaterial 
          map={placeholderTexture}
          emissive={isHovered ? '#ffffff' : '#000000'}
          emissiveIntensity={isHovered ? 0.1 : 0}
        />
      </mesh>

      {/* Ornate corners for ornate style */}
      {frameStyle === 'ornate' && (
        <>
          <mesh position={[-frameWidth / 2 - borderThickness / 2, frameHeight / 2 + borderThickness / 2, 0.03]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[frameWidth / 2 + borderThickness / 2, frameHeight / 2 + borderThickness / 2, 0.03]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[-frameWidth / 2 - borderThickness / 2, -frameHeight / 2 - borderThickness / 2, 0.03]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[frameWidth / 2 + borderThickness / 2, -frameHeight / 2 - borderThickness / 2, 0.03]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
          </mesh>
        </>
      )}

      {/* Caption plaque */}
      {(caption || date) && (
        <>
          <mesh position={[0, -frameHeight / 2 - borderThickness - 0.15, 0]}>
            <boxGeometry args={[frameWidth * 0.8, 0.15, 0.02]} />
            <meshStandardMaterial color="#2a2a2a" metalness={0.3} roughness={0.7} />
          </mesh>
          
          {caption && (
            <Text
              position={[0, -frameHeight / 2 - borderThickness - 0.12, 0.02]}
              fontSize={0.08}
              color="#d4af37"
              anchorX="center"
              anchorY="middle"
            >
              {caption}
            </Text>
          )}
          
          {date && (
            <Text
              position={[0, -frameHeight / 2 - borderThickness - 0.18, 0.02]}
              fontSize={0.06}
              color="#999999"
              anchorX="center"
              anchorY="middle"
            >
              {date}
            </Text>
          )}
        </>
      )}

      {/* Glass effect overlay */}
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[frameWidth, frameHeight]} />
        <meshStandardMaterial 
          transparent 
          opacity={0.1} 
          color="#ffffff"
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}
