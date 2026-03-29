import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap } from 'lucide-react';
import './Projects.css';

export default function Projects() {
  const [sliderVal, setSliderVal] = useState(50);

  return (
    <div className="projects-page">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="projects-header">
        <h1 className="mono glow-text">Past Projects</h1>
        <p style={{ color: 'var(--text-secondary)' }}>See how we've helped businesses grow faster.</p>
      </motion.div>

      <div className="projects-content">
        <div className="glass-panel metrics-dashboard">
          <div className="dashboard-header mono glow-text">
            <span>Client: E-Comm Alpha</span>
            <span style={{ color: 'var(--jarvis-blue)' }}>Status: Optimized</span>
          </div>
          
          <div className="comparison-container">
            <div className="labels">
              <span className="mono" style={{ color: 'red' }}>Before Automation</span>
              <span className="mono" style={{ color: 'var(--jarvis-blue)', textShadow: '0 0 5px var(--jarvis-blue)' }}>After Automation</span>
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
                <Activity color="red" size={32} />
                <h3 className="mono" style={{ color: 'var(--text-secondary)' }}>Lead Response Time</h3>
                <h2 style={{ color: 'red' }}>2.4 Hours</h2>
              </div>
              <div className="stat-box" style={{ opacity: sliderVal / 100 }}>
                <Zap color="var(--jarvis-blue)" size={32} className="glow-icon" />
                <h3 className="mono glow-text">Automated Outreach</h3>
                <h2 className="glow-text" style={{ color: 'var(--jarvis-blue)', fontSize: '2rem' }}>&lt; 2 Seconds</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
