import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, PerspectiveCamera, PresentationControls, Stage, TorusKnot } from '@react-three/drei';
import * as THREE from 'three';

function Scene() {
  const meshRef = useRef();
  const { mouse, viewport } = useThree();
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;

      // Mouse following tilt
      const targetX = (mouse.x * viewport.width) / 8;
      const targetY = (mouse.y * viewport.height) / 8;
      
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.1);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1);
      
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetY, 0.1);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX, 0.1);
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <TorusKnot 
          ref={meshRef} 
          args={[1, 0.3, 128, 32]}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
        >
          <MeshDistortMaterial 
            color={hovered ? "#3b82f6" : "#2563eb"}
            speed={2} 
            distort={0.4} 
            radius={1}
            metalness={0.8}
            roughness={0.2}
          />
        </TorusKnot>
      </Float>
    </>
  );
}

export default function Brand3D() {
  return (
    <div style={{ width: '100%', height: '400px', cursor: 'grab', position: 'relative', zIndex: 10 }}>
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <Scene />
      </Canvas>
    </div>
  );
}
