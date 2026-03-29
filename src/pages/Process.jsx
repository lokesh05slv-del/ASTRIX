import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Search, PenTool, Share2, Rocket, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Process.css';

const steps = [
  {
    icon: Search,
    title: "Step 1: System Audit",
    desc: "We analyze your current lead generation and identify communication gaps in your business.",
    color: "#00f0ff"
  },
  {
    icon: PenTool,
    title: "Step 2: Architecture Design",
    desc: "Our architects build your custom high-conversion website and AI neural logic.",
    color: "#00f0ff"
  },
  {
    icon: Share2,
    title: "Step 3: Neural Integration",
    desc: "We hook up your WhatsApp, Email, and CRM systems into a unified automation engine.",
    color: "#00f0ff"
  },
  {
    icon: Rocket,
    title: "Step 4: Launch & Scale",
    desc: "Your system goes live. We monitor and optimize to ensure 24/7 lead conversion.",
    color: "#00f0ff"
  }
];

function TimelineStep({ icon: Icon, title, desc, index }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`timeline-step ${index % 2 === 0 ? 'left' : 'right'}`}
    >
      <div className="step-content glass-panel">
        <div className="step-icon-wrapper">
          <Icon size={32} color="var(--jarvis-blue)" className="glow-icon" />
        </div>
        <h3 className="mono glow-text">{title}</h3>
        <p>{desc}</p>
      </div>
      <div className="step-number mono">{index + 1}</div>
    </motion.div>
  );
}

export default function Process() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="process-page page-container" ref={containerRef}>
      <section className="process-hero">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mono glow-text"
        >
          How Astrix Works
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="process-subtitle"
        >
          Our 4-step protocol to scale your business leads.
        </motion.p>
      </section>

      <section className="timeline-container">
        {/* Glowing Connected Line */}
        <motion.div 
          className="timeline-line" 
          style={{ scaleY, originY: 0 }}
        />
        
        <div className="steps-wrapper">
          {steps.map((step, index) => (
            <TimelineStep key={index} {...step} index={index} />
          ))}
        </div>
      </section>

      <section className="final-cta">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="cta-card glass-panel"
        >
          <h2 className="mono glow-text">READY TO START YOUR AUDIT?</h2>
          <p>Initialize your business automation protocol today.</p>
          <button 
            onClick={() => navigate('/contact')}
            className="submit-btn mono glow-button cta-btn"
          >
            Start Your Audit <ArrowRight style={{ marginLeft: '10px' }} />
          </button>
        </motion.div>
      </section>
    </div>
  );
}
