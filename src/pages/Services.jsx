import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Code, GitMerge, Bot } from 'lucide-react';
import './Services.css';

function HoverCard({ title, description, Icon }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  function resetMouse() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      className="glass-panel service-card"
    >
      <Icon size={48} className="glow-icon" color="var(--jarvis-blue)" style={{ marginBottom: '1rem' }} />
      <h2 className="mono glow-text" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{title}</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{description}</p>
    </motion.div>
  );
}

export default function Services() {
  return (
    <div className="services-page">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="services-header"
      >
        <h1 className="mono glow-text" style={{ fontSize: '3rem' }}>Our Services</h1>
        <p style={{ color: 'var(--text-secondary)' }}>High-performance web development and intelligent automation.</p>
      </motion.div>
      
      <div className="services-grid">
        <HoverCard 
          title="Website Development" 
          description="High-performance, visually stunning architectures specifically built for conversion. React, Next.js, and immersive 3D web experiences."
          Icon={Code}
        />
        <HoverCard 
          title="Automation Systems" 
          description="WhatsApp, Email, and internal CRM syncing. We build automated data pipelines that convert leads silently in the background."
          Icon={GitMerge}
        />
        <HoverCard 
          title="AI Solutions" 
          description="Integrating large language models directly into your business logic. Smart chatbots, data extraction, and AI-driven growth hooks."
          Icon={Bot}
        />
      </div>
    </div>
  );
}
