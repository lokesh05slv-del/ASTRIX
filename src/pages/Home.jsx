import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function HologramCore() {
  const mesh = useRef();
  useFrame((state) => {
    mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[2, 1]} />
        <meshStandardMaterial color="#00f0ff" wireframe />
      </mesh>
      <Sphere args={[1.4, 32, 32]}>
        <MeshDistortMaterial
          color="#00f0ff"
          attach="material"
          distort={0.4}
          speed={2}
          transparent
          opacity={0.3}
        />
      </Sphere>
    </Float>
  );
}

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-page page-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
          <HologramCore />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ zIndex: 1, textAlign: 'center', pointerEvents: 'none' }}
      >
        <h1 className="glow-text mono glitch-text" data-text="ASTRIX" style={{ fontSize: 'clamp(2.5rem, 12vw, 5rem)', marginBottom: '1rem' }}>ASTRIX</h1>
        <p style={{ fontSize: 'clamp(0.9rem, 4vw, 1.2rem)', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem', padding: '0 1.5rem' }}>
          Automating your business. Engineering your digital presence. Powered by AI.
        </p>
        <button 
          onClick={() => navigate('/services')}
          style={{ 
            pointerEvents: 'auto',
            background: 'transparent',
            border: '1px solid var(--jarvis-blue)',
            color: 'var(--jarvis-blue)',
            padding: '0.8rem 1.5rem',
            fontSize: '1.1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            margin: '0 auto',
            borderRadius: '4px',
            boxShadow: '0 0 15px var(--jarvis-blue-glow)',
            textTransform: 'uppercase',
            fontFamily: "'Share Tech Mono', monospace",
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)';
            e.currentTarget.style.boxShadow = '0 0 25px var(--jarvis-blue-glow)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.boxShadow = '0 0 15px var(--jarvis-blue-glow)';
          }}
        >
          Initialize Systems <ArrowRight size={20} />
        </button>
      </motion.div>
    </div>
  );
}
