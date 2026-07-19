import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Brush, Sparkles, Layout, Diamond } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import './Home.css';

const siteUrl = 'https://astrix-webservices.netlify.app';

const combinedSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "Astrix",
      "url": siteUrl,
      "logo": `${siteUrl}/logo.png`,
      "description": "Premium design and web development agency."
    },
    {
      "@type": "WebSite",
      "url": siteUrl
    }
  ]
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page page-container">
      <SEO 
        title="Astrix - Premium Web & Brand Design" 
        description="Astrix is a premium design and web development agency creating high-end digital platforms and brand identities."
        keywords="astrix, premium web design, brand identity, luxury graphic design, UI/UX"
        canonical="/"
        schemaData={combinedSchema}
      />
      {/* Soft Light Orbs Effect */}
      <div className="hero-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="hero-content fade-in">
        <motion.div 
          className="badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Diamond size={16} fill="currentColor" /> PREMIUM DESIGN AGENCY
        </motion.div>
        
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          Crafting Visual Brands <br />
          <span className="text-brand">That Demand Attention</span>
        </motion.h1>
        
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          ASTRIX Solutions designs high-end digital experiences, visual identities, and custom graphics that command authority and engage visitors with seamless elegance.
        </motion.p>
        
        <motion.div 
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <button 
            className="btn-primary"
            onClick={() => navigate('/services')}
          >
            Explore Services <ArrowRight size={18} />
          </button>
          <button 
            className="btn-secondary"
            onClick={() => navigate('/contact')}
          >
            Schedule Consultation
          </button>
        </motion.div>
          
        <motion.div 
          className="hero-features-section"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <div className="feature-card card-clean fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="icon-wrapper">
              <Sparkles size={32} color="var(--brand-accent)" />
            </div>
            <div className="feature-content">
              <h3>Strategic Brand Design</h3>
              <p>Establish undeniable market authority with cohesive visual identity kits, typography, and premium logos.</p>
            </div>
          </div>
          
          <div className="feature-card card-clean fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="icon-wrapper">
              <Brush size={32} color="var(--brand-accent)" />
            </div>
            <div className="feature-content">
              <h3>Elite Graphic Design</h3>
              <p>High-impact vectors, elegant illustrations, and sophisticated digital collateral handcrafted to captivate.</p>
            </div>
          </div>

          <div className="feature-card card-clean fade-in" style={{ animationDelay: '0.7s' }}>
            <div className="icon-wrapper">
              <Layout size={32} color="var(--brand-accent)" />
            </div>
            <div className="feature-content">
              <h3>Premium Web Platforms</h3>
              <p>SEO-optimized React applications built with fluid animations to turn visitors into dedicated clients.</p>
            </div>
          </div>
        </motion.div>
        
        {/* Our Work Section */}
        <motion.div 
          className="home-work-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="work-header">
            <h2>Selected Works</h2>
            <p>A glimpse into our premium design portfolio.</p>
          </div>
          
          <div className="work-grid">
            {/* Portfolio items will be populated here */}
          </div>
          
          <div className="work-footer">
            <button className="btn-secondary" onClick={() => navigate('/portfolio')}>
              View Full Portfolio
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
