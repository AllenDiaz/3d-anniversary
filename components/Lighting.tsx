'use client';

export default function Lighting() {
  return (
    <>
      {/* Ambient base lighting - provides overall illumination */}
      <ambientLight intensity={0.6} />
      
      {/* Hemisphere light for natural sky/ground lighting */}
      <hemisphereLight
        color="#ffffff"
        groundColor="#666666"
        intensity={0.5}
        position={[0, 50, 0]}
      />

      {/* Main Gallery - Central overhead light */}
      <pointLight 
        position={[0, 3.5, 0]} 
        intensity={1.5} 
        color="#ffffff" 
        distance={15}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
      
      {/* Gallery wall lights - simplified */}
      <pointLight position={[-5, 3, 2]} intensity={1.2} color="#fff8dc" distance={6} />
      <pointLight position={[-5, 3, -2]} intensity={1.2} color="#fff8dc" distance={6} />
      <pointLight position={[5, 3, 2]} intensity={1.2} color="#fff8dc" distance={6} />
      <pointLight position={[5, 3, -2]} intensity={1.2} color="#fff8dc" distance={6} />
      <pointLight position={[0, 3, -6]} intensity={1.2} color="#fff8dc" distance={6} />

      {/* First Date Room - Pink romantic ambiance */}
      <pointLight
        position={[-10, 3.2, 0]}
        intensity={2}
        color="#ff69b4"
        distance={10}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
      <pointLight position={[-10, 2.5, 2]} intensity={0.8} color="#ffb3d9" distance={6} />
      <pointLight position={[-10, 2.5, -2]} intensity={0.8} color="#ffb3d9" distance={6} />

      {/* Adventures Room - Blue explorer ambiance */}
      <pointLight
        position={[10, 3.2, 0]}
        intensity={2}
        color="#4da6ff"
        distance={10}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
      <pointLight position={[10, 2.5, 2]} intensity={0.8} color="#b3d9ff" distance={6} />
      <pointLight position={[10, 2.5, -2]} intensity={0.8} color="#b3d9ff" distance={6} />

      {/* Special Moments Room - Purple/pink magical ambiance */}
      <pointLight
        position={[0, 3.5, -11.5]}
        intensity={2}
        color="#ff99cc"
        distance={10}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
      <pointLight position={[-2, 2.8, -11.5]} intensity={0.9} color="#ffccff" distance={6} />
      <pointLight position={[2, 2.8, -11.5]} intensity={0.9} color="#ffccff" distance={6} />
      
      {/* Doorway accent lights */}
      <pointLight position={[-6, 2, 0]} intensity={0.5} color="#ffffff" distance={4} />
      <pointLight position={[6, 2, 0]} intensity={0.5} color="#ffffff" distance={4} />
      <pointLight position={[0, 2, -7.5]} intensity={0.5} color="#ffffff" distance={4} />
    </>
  );
}
