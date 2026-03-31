import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Code, GitMerge, Bot, ExternalLink, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Services.css';

function ServiceCard({ title, description, Icon, slug, index }) {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/services/${slug}`)}
      className="card-clean service-card fade-in"
      style={{ animationDelay: `${index * 0.15}s` }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="card-top">
        <div className="icon-wrapper" style={{ margin: 0, width: '56px', height: '56px' }}>
          <Icon size={28} color="var(--brand-blue)" />
        </div>
        <ArrowRight size={20} className="card-arrow text-brand" />
      </div>
      <h2 style={{ fontSize: '1.4rem', margin: '1.5rem 0 1rem', color: 'var(--text-primary)' }}>{title}</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2rem' }}>{description}</p>
      
      <button className="btn-secondary service-explore-btn">
        Explore Details
      </button>
    </motion.div>
  );
}

export default function Services() {
  return (
    <div className="services-page page-container">
      <div className="hero-background">
        <div className="blob blob-1"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="services-header fade-in"
      >
        <div className="badge">CAPABILITIES</div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>Our <span className="text-brand">Services</span></h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Strategic technology solutions designed to optimize workflows and scale your digital presence.
        </p>
      </motion.div>
      
      <div className="services-grid">
        <ServiceCard 
          index={1}
          title="Digital Platforms" 
          slug="web-development"
          description="High-performance, secure web applications built on Next.js and React. We deliver scalable architectures focused on user experience and conversion."
          Icon={Code}
        />
        <ServiceCard 
          index={2}
          title="Process Automation" 
          slug="automation-systems"
          description="Custom API integrations, CRM synchronization, and automated lead nurturing to reduce manual work and accelerate your operational velocity."
          Icon={GitMerge}
        />
        <ServiceCard 
          index={3}
          title="Applied AI Solutions" 
          slug="ai-solutions"
          description="Integrate large language models into your business logic. We build intelligent agents that analyze data and automate complex cognitive tasks."
          Icon={Bot}
        />
      </div>
    </div>
  );
}
