'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

interface FloorTilesProps {
  width: number;
  depth: number;
  position?: [number, number, number];
  tileSize?: number;
  tileColor1?: string;
  tileColor2?: string;
  groutColor?: string;
  pattern?: 'checkerboard' | 'uniform' | 'marble';
}

export default function FloorTiles({
  width,
  depth,
  position = [0, 0, 0],
  tileSize = 0.5,
  tileColor1 = '#e0e0e0',
  tileColor2 = '#c0c0c0',
  groutColor = '#1a1a1a',
  pattern = 'checkerboard',
}: FloorTilesProps) {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    const size = 256;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return null;

    // Draw tile based on pattern
    if (pattern === 'checkerboard') {
      // Checkerboard pattern
      ctx.fillStyle = tileColor1;
      ctx.fillRect(0, 0, size, size);
      
      ctx.fillStyle = tileColor2;
      ctx.fillRect(size / 2, 0, size / 2, size / 2);
      ctx.fillRect(0, size / 2, size / 2, size / 2);
    } else if (pattern === 'marble') {
      // Marble effect
      const gradient = ctx.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, tileColor1);
      gradient.addColorStop(0.5, tileColor2);
      gradient.addColorStop(1, tileColor1);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
      
      // Add marble veins
      ctx.strokeStyle = tileColor2;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, size * 0.3);
      ctx.quadraticCurveTo(size * 0.5, size * 0.4, size, size * 0.6);
      ctx.stroke();
    } else {
      // Uniform pattern
      ctx.fillStyle = tileColor1;
      ctx.fillRect(0, 0, size, size);
    }
    
    // Draw grout lines
    ctx.strokeStyle = groutColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, size, size);
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(width / tileSize, depth / tileSize);
    
    return tex;
  }, [width, depth, tileSize, tileColor1, tileColor2, groutColor, pattern]);

  return (
    <mesh 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={position}
      receiveShadow
    >
      <planeGeometry args={[width, depth]} />
      <meshStandardMaterial 
        map={texture} 
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}
