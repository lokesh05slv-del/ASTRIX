import React from 'react';
import { motion } from 'framer-motion';
import { Code, Brush, Layout, Palette, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import './Services.css';

function ServiceCard({ title, description, Icon, slug, index }) {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/services/${slug}`)}
      className="card-clean service-card fade-in"
      style={{ animationDelay: `${index * 0.15}s` }}
      whileHover={{ 
        scale: 1.02, 
        translateY: -5,
        transition: { duration: 0.2 } 
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="card-top">
        <motion.div 
          className="icon-wrapper" 
          style={{ margin: 0, width: '56px', height: '56px' }}
          whileHover={{ rotate: 10, scale: 1.1 }}
        >
          <Icon size={28} color="var(--brand-blue)" />
        </motion.div>
        <ArrowRight size={20} className="card-arrow text-brand" />
      </div>
      <h2 style={{ fontSize: '1.4rem', margin: '1.5rem 0 1rem', color: 'var(--text-primary)' }}>{title}</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2rem' }}>{description}</p>
      
      <motion.button 
        className="btn-secondary service-explore-btn"
        whileHover={{ x: 5 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        Explore Details
      </motion.button>
    </motion.div>
  );
}

export default function Services() {
  return (
    <div className="services-page page-container">
      <SEO 
        title="Solutions & Capabilities" 
        description="Explore our specialized design services: Digital Platform Engineering, Creative Graphic Design, UI/UX & Interactive Design, and Strategic Brand Identity."
        canonical="/services"
        keywords="web design, graphic design agency, digital platform development, UI/UX design, corporate branding, professional logo design, vector graphics, identity kits"
      />
      <div className="hero-background">
        <div className="blob blob-1"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="services-header fade-in"
      >
        <div className="badge">CAPABILITIES</div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>
          Our <span className="text-brand">Specializations</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Strategic creative solutions designed to elevate your visual authority and scale your digital presence globally.
        </p>
      </motion.div>
      
      <div className="services-grid">
        <ServiceCard 
          index={1}
          title="Digital Platforms" 
          slug="web-development"
          description="High-performance, secure web applications built with flawless React code. We deliver scalable architectures focused on design aesthetics and rapid load times."
          Icon={Code}
        />
        <ServiceCard 
          index={2}
          title="Graphic Design" 
          slug="graphic-design"
          description="Custom illustrations, vector assets, marketing collateral, and high-impact visual design. Handcrafted by elite graphic designers to communicate your brand story."
          Icon={Brush}
        />
        <ServiceCard 
          index={3}
          title="UI/UX Design" 
          slug="ui-ux-design"
          description="Seamless user experiences and stunning interfaces. High-fidelity wireframes, interactive prototypes, and custom motion graphics tailored for maximum conversion."
          Icon={Layout}
        />
        <ServiceCard 
          index={4}
          title="Design & Branding" 
          slug="design-branding"
          description="Elevate your visual identity with professional, consistent branding across all digital platforms. From custom logos to 3D brand assets."
          Icon={Palette}
        />
      </div>
    </div>
  );
}
