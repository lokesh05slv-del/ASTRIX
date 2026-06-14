import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Palette } from 'lucide-react';
import SEO from '../components/SEO';
import './Projects.css';

export default function Projects() {
  const [sliderVal, setSliderVal] = useState(50);

  return (
    <div className="projects-page">
      <SEO 
        title="Enterprise Case Studies" 
        description="Explore how Astrix elevates brands and captures leads. See real-world results in user engagement, conversion rates, and corporate trust."
        canonical="/projects"
        keywords="case studies, design results, rebranding transformation, ROI case studies"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="projects-header">
        <div className="badge">OUTCOMES</div>
        <h1 className="hero-title" style={{ marginTop: '1rem' }}>Case <span className="text-brand">Studies</span></h1>
        <p style={{ color: 'var(--text-secondary)' }}>Quantifiable results through elite design engineering.</p>
      </motion.div>

      <div className="projects-content">
        <div className="glass-panel metrics-dashboard">
          <div className="dashboard-header mono glow-text">
            <span>Client: E-Comm Alpha</span>
            <span style={{ color: 'var(--brand-blue)' }}>Status: Rebranded & Optimized</span>
          </div>
          
          <div className="comparison-container">
            <div className="labels">
              <span className="mono" style={{ color: 'red' }}>Before Rebranding</span>
              <span className="mono" style={{ color: 'var(--brand-blue)', textShadow: '0 0 5px var(--brand-blue)' }}>After Rebranding</span>
            </div>
            
            <input 
              type="range" 
              min="0" max="100" 
              value={sliderVal} 
              onChange={(e) => setSliderVal(e.target.value)}
              className="slider"
            />
            
            <div className="stats-grid">
              <div className="stat-box" style={{ opacity: 1 - sliderVal / 100 }}>
                <Palette color="red" size={32} />
                <h3 className="mono" style={{ color: 'var(--text-secondary)' }}>Lead Conversion Rate</h3>
                <h2 style={{ color: 'red' }}>1.4%</h2>
              </div>
              <div className="stat-box" style={{ opacity: sliderVal / 100 }}>
                <Sparkles color="var(--brand-blue)" size={32} className="glow-icon" />
                <h3 className="mono glow-text">Premium Interactive Design</h3>
                <h2 className="glow-text" style={{ color: 'var(--brand-blue)', fontSize: '2rem' }}>6.8% Conversion</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
