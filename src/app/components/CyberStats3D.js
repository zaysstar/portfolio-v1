"use client";
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import { useMemo, useRef, useState } from 'react';

// --- DATA ---
const stats = [
  { label: "CODING", value: 74 },     
  { label: "DESIGN", value: 90 },     
  { label: "WRITING", value: 70 },    
  { label: "LEADERSHIP", value: 95 }, 
  { label: "TEAMWORK", value: 91 },   
  { label: "STRATEGY", value: 83 },    
];

// --- SETTINGS (Smaller scale to fit screen) ---
const SCALE = 1.5; // Reduced from 3.5 to prevent cutting off text

// --- MATH HELPER ---
const getVertex = (index, total, radius) => {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  return [Math.cos(angle) * radius, 0, Math.sin(angle) * radius];
};

// --- MAIN ANIMATED COMPONENT ---
function RadarGraph() {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);

  // 1. Create Initial Geometry
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices = new Float32Array((stats.length + 1) * 3); // Center + 6 points
    const indices = [];

    // Center point (0,0,0)
    vertices[0] = 0; vertices[1] = 0; vertices[2] = 0;

    // Create triangles for the fan shape
    for (let i = 1; i <= stats.length; i++) {
      const next = i === stats.length ? 1 : i + 1;
      indices.push(0, i, next);
    }

    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geo.setIndex(indices);
    return geo;
  }, []);

  // 2. The Animation Loop
  useFrame(({ clock }) => {
    if (meshRef.current) {
        const time = clock.getElapsedTime();
        const positionAttribute = meshRef.current.geometry.attributes.position;

        stats.forEach((stat, i) => {
            // Animation Math
            const startDelay = i * 0.1;
            const progress = Math.max(0, Math.min(1, (time - startDelay) * 1.5));
            const ease = 1 - Math.pow(1 - progress, 3);
            
            // Dynamic Radius based on value and animation
            const radius = (stat.value / 100) * SCALE * ease;
            const [x, y, z] = getVertex(i, stats.length, radius);

            // Update Vertex (index + 1 because 0 is center)
            positionAttribute.setXYZ(i + 1, x, y, z);
        });

        positionAttribute.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* THE FILLED SHAPE */}
      <mesh 
        ref={meshRef} 
        geometry={geometry}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <meshBasicMaterial 
            color={hovered ? "#980733" : "#fc0f56"} // Brighter red on hover
            transparent 
            opacity={hovered ? 0.7 : 0.5} 
            side={THREE.DoubleSide} 
        />
      </mesh>

      {/* CORNER DOTS */}
      <group>
        {stats.map((stat, i) => {
             // We calculate static positions for dots here since geometry updates are handled in shader usually
             // But for simplicity in JS, we just place them at max potential or let them move?
             // Let's keep them simple: static dots at the tips look cleaner for the "tech" vibe
             return null; 
        })}
      </group>
    </group>
  );
}

// --- STATIC BACKGROUND GRID ---
function StaticGrid() {
    const outerGeo = useMemo(() => {
        const points = [];
        const [startX, startY, startZ] = getVertex(0, stats.length, SCALE);
        points.push(new THREE.Vector3(startX, startY, startZ));

        for(let i=1; i<=stats.length; i++) {
            const [x,y,z] = getVertex(i % stats.length, stats.length, SCALE);
            points.push(new THREE.Vector3(x,y,z));
        }
        return new THREE.BufferGeometry().setFromPoints(points);
    }, []);

    const midGeo = useMemo(() => {
        const points = [];
        const [startX, startY, startZ] = getVertex(0, stats.length, SCALE / 2);
        points.push(new THREE.Vector3(startX, startY, startZ));

        for(let i=1; i<=stats.length; i++) {
            const [x,y,z] = getVertex(i % stats.length, stats.length, SCALE / 2);
            points.push(new THREE.Vector3(x,y,z));
        }
        return new THREE.BufferGeometry().setFromPoints(points);
    }, []);

    // Spokes (Lines from center to outer edge)
    const spokesGeo = useMemo(() => {
        const points = [];
        for(let i=0; i<stats.length; i++) {
            const [x,y,z] = getVertex(i, stats.length, SCALE);
            points.push(new THREE.Vector3(0,0,0));
            points.push(new THREE.Vector3(x,y,z));
        }
        return new THREE.BufferGeometry().setFromPoints(points);
    }, []);

    return (
        <group>
            {/* Outer Ring */}
            <line geometry={outerGeo}>
                <lineBasicMaterial color="#94a3b8" linewidth={1} />
            </line>
            {/* Inner Ring */}
            <line geometry={midGeo}>
                <lineBasicMaterial color="#334155" linewidth={1} />
            </line>
             {/* Spokes */}
             <line segments geometry={spokesGeo}>
                <lineBasicMaterial color="#334155" transparent opacity={0.3} />
            </line>
        </group>
    );
}

// --- LABELS ---
function Labels() {
    return (
        <group>
            {stats.map((stat, i) => {
                const [x, y, z] = getVertex(i, stats.length, SCALE + 0.6); // Distance from center
                return (
                    <Text
                        key={i}
                        position={[x, y, z]}
                        fontSize={0.3}
                        color="#e2e8f0"
                        anchorX="center"
                        anchorY="middle"
                        rotation={[-Math.PI / 2, 0, 0]} // Rotate flat
                    >
                        {stat.label}
                    </Text>
                );
            })}
        </group>
    );
}

export default function CyberStats3D() {
  return (
    <div className="w-full h-full cursor-move">
      <Canvas camera={{ position: [0, 7, 0], fov: 50 }}>
        
        <ambientLight intensity={1} />

        {/* INTERACTIVITY: Allows rotation but limits vertical angle so it never flips upside down */}
        <OrbitControls 
            enableZoom={false} 
            maxPolarAngle={Math.PI / 2.5} // Prevents going below the floor
            minPolarAngle={0}             // Prevents looking from underneath
        />

        <group rotation={[0, 0, 0]}>
            <StaticGrid />
            <RadarGraph />
            <Labels />
        </group>

      </Canvas>
    </div>
  );
}