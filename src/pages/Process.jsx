import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Search, PenTool, Layers, Rocket, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import './Process.css';

const steps = [
  {
    icon: Search,
    title: "1. Brand Discovery",
    desc: "We dive deep into your market position, target audience, and business goals to outline a strategic creative roadmap."
  },
  {
    icon: PenTool,
    title: "2. Concept & Visual Design",
    desc: "Our graphic designers and UI artists map wireframes, vector concepts, and premium visual interfaces for your review."
  },
  {
    icon: Layers,
    title: "3. Crafting & Code",
    desc: "We bring designs to life with custom code, responsive CSS layout structures, and high-end animations."
  },
  {
    icon: Rocket,
    title: "4. Launch & Optimization",
    desc: "Your premium digital platform goes live. We fine-tune technical details, optimize for SEO, and track lead conversion."
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

  const siteUrl = 'https://astrix-webservices.netlify.app';

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "ASTRIX Creative Design Protocol",
    "description": "Our structured design and engineering methodology for launching modern digital platforms.",
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.title,
      "text": step.desc
    }))
  };

  return (
    <div className="process-page page-container" ref={containerRef}>
      <SEO 
        title="Our Creative Process" 
        description="Learn about the ASTRIX engineering protocol: Brand Discovery, Concept & Visual Design, Crafting & Code, and Launch Optimization."
        canonical="/process"
        schemaData={howToSchema}
      />
      <section className="process-hero fade-in">
        <div className="badge">WORKFLOW</div>
        <h1 className="hero-title pt-4">Creative <span className="text-brand">Process</span></h1>
        <p className="process-subtitle">
          A structured design and development protocol engineered to launch premium brands and conversion-focused web layouts.
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
          <h2>Ready to launch your project?</h2>
          <p>Schedule a discovery call to discuss your creative and web objectives.</p>
          <button 
            onClick={() => navigate('/contact')}
            className="btn-primary"
            style={{ marginTop: '1.5rem' }}
          >
            Contact Creative Team <ArrowRight size={18} />
          </button>
        </motion.div>
      </section>
    </div>
  );
}
