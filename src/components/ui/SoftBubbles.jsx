import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function SoftBubbles() {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    // Generate an array of bubble configurations
    const newBubbles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 80 + 20, // Random sizes between 20px and 100px
      startX: Math.random() * 100, // Random start X position
      duration: Math.random() * 20 + 15, // Slow float duration
      delay: Math.random() * 10, // Staggered start times
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          initial={{
            x: `${bubble.startX}vw`,
            y: `110vh`,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            y: `-20vh`, // Float up past the screen
            x: [
              `${bubble.startX}vw`, 
              `${bubble.startX + Math.random() * 10}vw`, 
              `${bubble.startX - Math.random() * 10}vw`, 
              `${bubble.startX}vw`
            ], // Gentle swaying
            opacity: [0, 0.7, 0.7, 0], // Fade in and out
            scale: [0.5, 1.2, 0.8, 1], // Soft pulsing
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            width: bubble.size,
            height: bubble.size,
            borderRadius: '50%',
            // Soft, cute, glassy orb effect
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(191,219,254,0.3) 40%, transparent 80%)',
            boxShadow: '0 0 20px rgba(255,255,255,0.3)',
            filter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  );
}
