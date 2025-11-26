'use client';

import { useRef, useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PointerLockControls, OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';

interface CameraControlsProps {
  mode: 'orbit' | 'firstPerson';
}

export default function CameraControls({ mode }: CameraControlsProps) {
  const { camera, gl } = useThree();
  const velocity = useRef(new Vector3());
  const direction = useRef(new Vector3());
  const [moveState, setMoveState] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  // First-person movement speed
  const speed = 0.1;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          setMoveState((s) => ({ ...s, forward: true }));
          break;
        case 'KeyS':
        case 'ArrowDown':
          setMoveState((s) => ({ ...s, backward: true }));
          break;
        case 'KeyA':
        case 'ArrowLeft':
          setMoveState((s) => ({ ...s, left: true }));
          break;
        case 'KeyD':
        case 'ArrowRight':
          setMoveState((s) => ({ ...s, right: true }));
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          setMoveState((s) => ({ ...s, forward: false }));
          break;
        case 'KeyS':
        case 'ArrowDown':
          setMoveState((s) => ({ ...s, backward: false }));
          break;
        case 'KeyA':
        case 'ArrowLeft':
          setMoveState((s) => ({ ...s, left: false }));
          break;
        case 'KeyD':
        case 'ArrowRight':
          setMoveState((s) => ({ ...s, right: false }));
          break;
      }
    };

    if (mode === 'firstPerson') {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [mode]);

  // Update camera position in first-person mode
  useFrame(() => {
    if (mode === 'firstPerson') {
      velocity.current.set(0, 0, 0);

      if (moveState.forward) velocity.current.z -= speed;
      if (moveState.backward) velocity.current.z += speed;
      if (moveState.left) velocity.current.x -= speed;
      if (moveState.right) velocity.current.x += speed;

      // Apply movement relative to camera direction
      direction.current.copy(velocity.current);
      direction.current.applyQuaternion(camera.quaternion);
      direction.current.y = 0; // Keep at eye level

      camera.position.add(direction.current);
      
      // Keep camera at eye level
      camera.position.y = 1.6;

      // Boundaries to prevent walking through walls
      camera.position.x = Math.max(-14, Math.min(14, camera.position.x));
      camera.position.z = Math.max(-18, Math.min(10, camera.position.z));
    }
  });

  if (mode === 'orbit') {
    return (
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={2}
        maxDistance={30}
        maxPolarAngle={Math.PI / 2}
        target={[0, 1, 0]}
      />
    );
  }

  return <PointerLockControls />;
}
