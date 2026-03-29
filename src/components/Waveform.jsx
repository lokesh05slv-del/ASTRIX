import React from 'react';
import { motion } from 'framer-motion';

export default function Waveform() {
  return (
    <div className="waveform-container" style={{ display: 'flex', gap: '2px', alignItems: 'center', height: '20px' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          animate={{
            height: [10, 20, 10],
            backgroundColor: ['#00f0ff', '#7dd3fc', '#00f0ff'],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
          style={{
            width: '2px',
            borderRadius: '1px',
            boxShadow: '0 0 5px var(--jarvis-blue-glow)'
          }}
        />
      ))}
    </div>
  );
}
