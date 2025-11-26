'use client';

export default function Lighting() {
  return (
    <>
      {/* Ambient base lighting - provides overall illumination */}
      <ambientLight intensity={0.8} />
      
      {/* Hemisphere light for natural sky/ground lighting */}
      <hemisphereLight
        color="#ffffff"
        groundColor="#888888"
        intensity={0.6}
        position={[0, 50, 0]}
      />

      {/* Directional light for subtle shadows (uses only 1 texture unit) */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={0.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      {/* Main Gallery - Central overhead light */}
      <pointLight 
        position={[0, 3.5, 0]} 
        intensity={1.8} 
        color="#ffffff" 
        distance={15}
      />
      
      {/* Gallery wall lights - simplified */}
      <pointLight position={[-5, 3, 2]} intensity={1.5} color="#fff8dc" distance={8} />
      <pointLight position={[-5, 3, -2]} intensity={1.5} color="#fff8dc" distance={8} />
      <pointLight position={[5, 3, 2]} intensity={1.5} color="#fff8dc" distance={8} />
      <pointLight position={[5, 3, -2]} intensity={1.5} color="#fff8dc" distance={8} />
      <pointLight position={[0, 3, -6]} intensity={1.5} color="#fff8dc" distance={8} />

      {/* First Date Room - Pink romantic ambiance */}
      <pointLight
        position={[-10, 3.2, 0]}
        intensity={2.5}
        color="#ff69b4"
        distance={12}
      />
      <pointLight position={[-10, 2.5, 2]} intensity={1} color="#ffb3d9" distance={7} />
      <pointLight position={[-10, 2.5, -2]} intensity={1} color="#ffb3d9" distance={7} />

      {/* Adventures Room - Blue explorer ambiance */}
      <pointLight
        position={[10, 3.2, 0]}
        intensity={2.5}
        color="#4da6ff"
        distance={12}
      />
      <pointLight position={[10, 2.5, 2]} intensity={1} color="#b3d9ff" distance={7} />
      <pointLight position={[10, 2.5, -2]} intensity={1} color="#b3d9ff" distance={7} />

      {/* Special Moments Room - Purple/pink magical ambiance */}
      <pointLight
        position={[0, 3.5, -11.5]}
        intensity={2.5}
        color="#ff99cc"
        distance={12}
      />
      <pointLight position={[-2, 2.8, -11.5]} intensity={1.2} color="#ffccff" distance={7} />
      <pointLight position={[2, 2.8, -11.5]} intensity={1.2} color="#ffccff" distance={7} />
      
      {/* Doorway accent lights */}
      <pointLight position={[-6, 2, 0]} intensity={0.6} color="#ffffff" distance={5} />
      <pointLight position={[6, 2, 0]} intensity={0.6} color="#ffffff" distance={5} />
      <pointLight position={[0, 2, -7.5]} intensity={0.6} color="#ffffff" distance={5} />
    </>
  );
}
