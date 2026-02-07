"use client";
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei';

function Artifact(props) {
  // This reference gives us direct access to the mesh
  const mesh = useRef();
  
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += delta * 0.2));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {/* The Shape: Icosahedron (20-sided polygon) looks very "Tech" */}
      <icosahedronGeometry args={[1, 0]} />
      
      {/* The Material: Wireframe for that "Blueprint" look */}
      <meshStandardMaterial 
        color={hovered ? "#4ade80" : "#22d3ee"} // Green on hover, Cyan normally
        wireframe={true}
        emissive={hovered ? "#4ade80" : "#22d3ee"}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

export default function CyberShape() {
  return (
    <div className="h-full w-full md:h-full md:absolute md:top-5 md:right-5 pointer-events-auto z-0">
      <Canvas>
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        
        {/* The Floating Object */}
        <Float speed={4} rotationIntensity={1} floatIntensity={2}>
            <Artifact position={[0, 0, 0]} />
        </Float>
        
        {/* Allows the user to rotate the object with mouse */}
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
}