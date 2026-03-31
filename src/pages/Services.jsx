import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Code, GitMerge, Bot, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Services.css';

function HoverCard({ title, description, Icon, slug }) {
  const navigate = useNavigate();
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
      onClick={() => navigate(`/services/${slug}`)}
      className="glass-panel service-card"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="card-top">
        <Icon size={48} className="glow-icon" color="var(--jarvis-blue)" style={{ marginBottom: '1rem' }} />
        <ExternalLink size={16} className="card-arrow" color="var(--jarvis-blue)" />
      </div>
      <h2 className="mono glow-text" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{title}</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>{description}</p>
      <button className="explore-btn mono">
        EXPLORE_DETAILS
      </button>
    </motion.div>
  );
}

export default function Services() {
  return (
    <div className="services-page page-container">
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
          slug="web-development"
          description="High-performance, visually stunning architectures specifically built for conversion. React, Next.js, and immersive 3D web experiences."
          Icon={Code}
        />
        <HoverCard 
          title="Automation Systems" 
          slug="automation-systems"
          description="WhatsApp, Email, and internal CRM syncing. We build automated data pipelines that convert leads silently in the background."
          Icon={GitMerge}
        />
        <HoverCard 
          title="AI Solutions" 
          slug="ai-solutions"
          description="Integrating large language models directly into your business logic. AI-driven data extraction and workflow hooks."
          Icon={Bot}
        />
      </div>
    </div>
  );
}
