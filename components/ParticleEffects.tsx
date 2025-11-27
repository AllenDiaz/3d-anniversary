'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ==================== FLOATING HEARTS PARTICLES ====================
interface FloatingHeartsProps {
  count?: number;
  position?: [number, number, number];
  spread?: [number, number, number];
  color?: string;
  size?: number;
  speed?: number;
}

export function FloatingHearts({
  count = 20,
  position = [0, 0, 0],
  spread = [8, 3, 8],
  color = '#ff69b4',
  size = 0.1,
  speed = 0.3,
}: FloatingHeartsProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Random position within spread
      pos[i3] = position[0] + (Math.random() - 0.5) * spread[0];
      pos[i3 + 1] = position[1] + Math.random() * spread[1];
      pos[i3 + 2] = position[2] + (Math.random() - 0.5) * spread[2];

      // Random upward velocity with slight drift
      vel[i3] = (Math.random() - 0.5) * 0.01;
      vel[i3 + 1] = Math.random() * 0.01 + 0.005;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    return [pos, vel];
  }, [count, position, spread]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Update position
      pos[i3] += velocities[i3] * speed;
      pos[i3 + 1] += velocities[i3 + 1] * speed;
      pos[i3 + 2] += velocities[i3 + 2] * speed;

      // Add wave motion
      pos[i3] += Math.sin(time + i) * 0.001;
      pos[i3 + 2] += Math.cos(time + i) * 0.001;

      // Reset if particle goes too high
      if (pos[i3 + 1] > position[1] + spread[1]) {
        pos[i3] = position[0] + (Math.random() - 0.5) * spread[0];
        pos[i3 + 1] = position[1];
        pos[i3 + 2] = position[2] + (Math.random() - 0.5) * spread[2];
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ==================== FALLING PETALS ====================
interface FallingPetalsProps {
  count?: number;
  position?: [number, number, number];
  spread?: [number, number, number];
  color?: string;
  size?: number;
  speed?: number;
}

export function FallingPetals({
  count = 30,
  position = [0, 3, 0],
  spread = [8, 2, 8],
  color = '#ffb3d9',
  size = 0.08,
  speed = 0.5,
}: FallingPetalsProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, velocities, rotations] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const rot = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = position[0] + (Math.random() - 0.5) * spread[0];
      pos[i3 + 1] = position[1] + Math.random() * spread[1];
      pos[i3 + 2] = position[2] + (Math.random() - 0.5) * spread[2];

      vel[i3] = (Math.random() - 0.5) * 0.02;
      vel[i3 + 1] = -Math.random() * 0.02 - 0.01;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.02;

      rot[i] = Math.random() * Math.PI * 2;
    }

    return [pos, vel, rot];
  }, [count, position, spread]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Falling motion
      pos[i3] += velocities[i3] * speed;
      pos[i3 + 1] += velocities[i3 + 1] * speed;
      pos[i3 + 2] += velocities[i3 + 2] * speed;

      // Swirling motion
      pos[i3] += Math.sin(time * 0.5 + rotations[i]) * 0.002;
      pos[i3 + 2] += Math.cos(time * 0.5 + rotations[i]) * 0.002;

      // Reset if petal falls too low
      if (pos[i3 + 1] < position[1] - spread[1] - 1) {
        pos[i3] = position[0] + (Math.random() - 0.5) * spread[0];
        pos[i3 + 1] = position[1] + Math.random() * spread[1];
        pos[i3 + 2] = position[2] + (Math.random() - 0.5) * spread[2];
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ==================== SPARKLE PARTICLES ====================
interface SparklesProps {
  count?: number;
  position?: [number, number, number];
  spread?: [number, number, number];
  color?: string;
  size?: number;
  speed?: number;
}

export function Sparkles({
  count = 50,
  position = [0, 2, 0],
  spread = [8, 3, 8],
  color = '#ffffff',
  size = 0.05,
  speed = 1,
}: SparklesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const scl = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = position[0] + (Math.random() - 0.5) * spread[0];
      pos[i3 + 1] = position[1] + (Math.random() - 0.5) * spread[1];
      pos[i3 + 2] = position[2] + (Math.random() - 0.5) * spread[2];

      scl[i] = Math.random();
    }

    return [pos, scl];
  }, [count, position, spread]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const material = pointsRef.current.material as THREE.PointsMaterial;
    const time = state.clock.elapsedTime * speed;

    // Twinkling effect
    material.opacity = 0.3 + Math.sin(time) * 0.3;

    // Individual sparkle intensity
    for (let i = 0; i < count; i++) {
      const twinkle = Math.sin(time * 2 + scales[i] * 10) * 0.5 + 0.5;
      // Store twinkle value for potential future use
      scales[i] = twinkle;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ==================== AMBIENT DUST MOTES ====================
interface DustMotesProps {
  count?: number;
  position?: [number, number, number];
  spread?: [number, number, number];
  color?: string;
  size?: number;
  speed?: number;
}

export function DustMotes({
  count = 40,
  position = [0, 2, 0],
  spread = [8, 4, 8],
  color = '#ffffff',
  size = 0.03,
  speed = 0.2,
}: DustMotesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = position[0] + (Math.random() - 0.5) * spread[0];
      pos[i3 + 1] = position[1] + (Math.random() - 0.5) * spread[1];
      pos[i3 + 2] = position[2] + (Math.random() - 0.5) * spread[2];

      vel[i3] = (Math.random() - 0.5) * 0.005;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.005;
    }

    return [pos, vel];
  }, [count, position, spread]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Slow drift
      pos[i3] += velocities[i3] * speed;
      pos[i3 + 1] += velocities[i3 + 1] * speed;
      pos[i3 + 2] += velocities[i3 + 2] * speed;

      // Brownian motion
      pos[i3] += Math.sin(time + i * 0.1) * 0.001;
      pos[i3 + 1] += Math.cos(time * 0.7 + i * 0.1) * 0.001;
      pos[i3 + 2] += Math.sin(time * 0.5 + i * 0.1) * 0.001;

      // Boundary check and wrap
      if (Math.abs(pos[i3] - position[0]) > spread[0] / 2) {
        pos[i3] = position[0] + (Math.random() - 0.5) * spread[0];
      }
      if (Math.abs(pos[i3 + 1] - position[1]) > spread[1] / 2) {
        pos[i3 + 1] = position[1] + (Math.random() - 0.5) * spread[1];
      }
      if (Math.abs(pos[i3 + 2] - position[2]) > spread[2] / 2) {
        pos[i3 + 2] = position[2] + (Math.random() - 0.5) * spread[2];
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ==================== MAGIC STARS (for Special Moments) ====================
interface MagicStarsProps {
  count?: number;
  position?: [number, number, number];
  spread?: [number, number, number];
  color?: string;
  size?: number;
  speed?: number;
}

export function MagicStars({
  count = 35,
  position = [0, 2, -11.5],
  spread = [8, 3, 8],
  color = '#ffccff',
  size = 0.06,
  speed = 0.8,
}: MagicStarsProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const phase = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = position[0] + (Math.random() - 0.5) * spread[0];
      pos[i3 + 1] = position[1] + (Math.random() - 0.5) * spread[1];
      pos[i3 + 2] = position[2] + (Math.random() - 0.5) * spread[2];

      phase[i] = Math.random() * Math.PI * 2;
    }

    return [pos, phase];
  }, [count, position, spread]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime * speed;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Circular orbit motion
      const radius = 0.5;
      const angle = time + phases[i];

      pos[i3] = position[0] + (Math.random() - 0.5) * spread[0] + Math.sin(angle) * radius;
      pos[i3 + 1] = position[1] + (Math.random() - 0.5) * spread[1] + Math.sin(time * 0.5 + phases[i]) * 0.3;
      pos[i3 + 2] = position[2] + (Math.random() - 0.5) * spread[2] + Math.cos(angle) * radius;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
