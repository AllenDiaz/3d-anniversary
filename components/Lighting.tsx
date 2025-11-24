'use client';

import { SpotLight } from '@react-three/drei';

export default function Lighting() {
  return (
    <>
      {/* Ambient base lighting */}
      <ambientLight intensity={0.4} />
      
      {/* Hemisphere light for natural lighting */}
      <hemisphereLight
        color="#ffffff"
        groundColor="#444444"
        intensity={0.3}
        position={[0, 50, 0]}
      />

      {/* Main Gallery Spotlights */}
      <SpotLight
        position={[0, 3.5, 0]}
        angle={0.6}
        penumbra={0.5}
        intensity={2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        color="#ffffff"
      />
      
      {/* Gallery wall spotlights - Left wall */}
      <SpotLight
        position={[-5, 3, 0]}
        angle={0.4}
        penumbra={0.6}
        intensity={1.5}
        castShadow
        color="#fff8dc"
        target-position={[-6, 1.5, 0]}
      />
      
      {/* Gallery wall spotlights - Right wall */}
      <SpotLight
        position={[5, 3, 0]}
        angle={0.4}
        penumbra={0.6}
        intensity={1.5}
        castShadow
        color="#fff8dc"
        target-position={[6, 1.5, 0]}
      />
      
      {/* Gallery wall spotlights - Back wall */}
      <SpotLight
        position={[0, 3, -6]}
        angle={0.4}
        penumbra={0.6}
        intensity={1.5}
        castShadow
        color="#fff8dc"
        target-position={[0, 1.5, -7.5]}
      />

      {/* First Date Room - Pink ambiance */}
      <SpotLight
        position={[-10, 3, 0]}
        angle={0.5}
        penumbra={0.5}
        intensity={2}
        castShadow
        color="#ffb3ba"
      />
      <pointLight
        position={[-10, 3, 0]}
        intensity={0.8}
        color="#ff69b4"
        distance={8}
      />

      {/* Adventures Room - Blue ambiance */}
      <SpotLight
        position={[10, 3, 0]}
        angle={0.5}
        penumbra={0.5}
        intensity={2}
        castShadow
        color="#b3d9ff"
      />
      <pointLight
        position={[10, 3, 0]}
        intensity={0.8}
        color="#4da6ff"
        distance={8}
      />

      {/* Special Moments Room - Romantic ambiance */}
      <SpotLight
        position={[0, 3.3, -11.5]}
        angle={0.5}
        penumbra={0.5}
        intensity={2}
        castShadow
        color="#ffccff"
      />
      <pointLight
        position={[0, 3, -11.5]}
        intensity={0.9}
        color="#ff99cc"
        distance={8}
      />
      
      {/* Accent lights for doorways/transitions */}
      <pointLight position={[-6, 2, 0]} intensity={0.3} color="#ffffff" distance={4} />
      <pointLight position={[6, 2, 0]} intensity={0.3} color="#ffffff" distance={4} />
      <pointLight position={[0, 2, -7.5]} intensity={0.3} color="#ffffff" distance={4} />
    </>
  );
}
