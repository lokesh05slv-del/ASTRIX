import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Brush, Sparkles, Layout } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import './Home.css';

const siteUrl = 'https://astrix-webservices.netlify.app';

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Astrix",
  "url": siteUrl,
  "logo": `${siteUrl}/logo.png`,
  "description": "Premium design and web development agency specializing in elite branding, graphic design, and custom websites.",
  "sameAs": [
    "https://twitter.com/astrix",
    "https://linkedin.com/company/astrix"
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": siteUrl,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${siteUrl}/services?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

const combinedSchema = {
  "@context": "https://schema.org",
  "@graph": [organizationSchema, websiteSchema]
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page page-container">
      <SEO 
        title="Web Design & Elite Graphic Branding Agency" 
        description="Astrix is a premium design and web development agency creating high-end digital platforms, brand identity, and graphic design built to capture leads."
        keywords="astrix, web design, graphic design agency, brand identity, custom logo, illustration, corporate graphics, react web development, user interface design"
        canonical="/"
        schemaData={combinedSchema}
      />
      {/* Soft Background Gradient Effect */}
      <div className="hero-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <div className="hero-content fade-in">
        <motion.div 
          className="hero-text-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="badge">ELITE WEB & BRAND DESIGN</div>
          <h1 className="hero-title">
            Crafting Visual Brands <br />
            <span className="text-brand">That Demand Attention</span>
          </h1>
          <p className="hero-subtitle">
            ASTRIX designs high-end digital experiences, visual identities, and custom graphics that command authority, engage visitors, and convert active leads.
          </p>
        </motion.div>
          
        <motion.div 
          className="hero-features-section"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="feature-card card-clean fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="icon-wrapper">
              <Sparkles size={24} color="var(--brand-blue)" />
            </div>
            <h3>Strategic Brand Design</h3>
            <p>Establish undeniable market authority with cohesive visual identity kits and logos.</p>
          </div>
          
          <div className="feature-card card-clean fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="icon-wrapper">
              <Brush size={24} color="var(--brand-blue)" />
            </div>
            <h3>Elite Graphic Design</h3>
            <p>High-impact vectors, illustrations, and digital collateral handcrafted to captivate.</p>
          </div>

          <div className="feature-card card-clean fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="icon-wrapper">
              <Layout size={24} color="var(--brand-blue)" />
            </div>
            <h3>Premium Web Platforms</h3>
            <p>SEO-optimized React applications built to rank, engage, and turn visitors into leads.</p>
          </div>
        </motion.div>

      </div>

      <motion.div 
        className="hero-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
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
    </div>
  );
}
