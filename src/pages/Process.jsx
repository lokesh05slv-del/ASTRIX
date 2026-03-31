import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Search, PenTool, Share2, Rocket, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Process.css';

const steps = [
  {
    icon: Search,
    title: "1. Systems Audit",
    desc: "We analyze your current lead generation pipelines and identify operational bottlenecks within your enterprise architecture."
  },
  {
    icon: PenTool,
    title: "2. Architecture Design",
    desc: "Our engineers architect a scalable, high-conversion digital platform tailored to your specific business logic."
  },
  {
    icon: Share2,
    title: "3. Systems Integration",
    desc: "We deploy secure API connections linking your CRM, communication channels, and internal tooling into a unified automation engine."
  },
  {
    icon: Rocket,
    title: "4. Deployment & Scaling",
    desc: "Your optimized infrastructure goes live. Our ongoing SLA ensures 99.9% uptime and continuous performance tuning."
  }
];

function TimelineStep({ icon: Icon, title, desc, index }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`timeline-step ${index % 2 === 0 ? 'left' : 'right'}`}
    >
      <div className="step-content card-clean">
        <div className="step-icon-wrapper">
          <Icon size={28} color="var(--brand-blue)" />
        </div>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
      <div className="step-number">{index + 1}</div>
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
      <section className="process-hero fade-in">
        <div className="badge">METHODOLOGY</div>
        <h1 className="hero-title pt-4">Implementation <span className="text-brand">Process</span></h1>
        <p className="process-subtitle">
          A structured engineering protocol designed to modernize your operations with zero downtime.
        </p>
      </section>

      <section className="timeline-container">
        {/* Animated Line */}
        <div className="timeline-line-background" />
        <motion.div 
          className="timeline-line-active" 
          style={{ scaleY, originY: 0 }}
        />
        
        <div className="steps-wrapper">
          {steps.map((step, index) => (
            <TimelineStep key={index} {...step} index={index} />
          ))}
        </div>
      </section>

      <section className="final-cta fade-in">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="cta-card card-clean"
        >
          <h2>Ready to initiate an enterprise audit?</h2>
          <p>Schedule a technical discovery call to evaluate your infrastructure.</p>
          <button 
            onClick={() => navigate('/contact')}
            className="btn-primary"
            style={{ marginTop: '1.5rem' }}
          >
            Contact Technical Sales <ArrowRight size={18} />
          </button>
        </motion.div>
      </section>
    </div>
  );
}
