import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart2, Shield, Zap } from 'lucide-react';
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
  "description": "Leading AI and automation agency specializing in digital optimization and enterprise workflows.",
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
        title="AI & Automation Web Design Agency" 
        description="Astrix is a premier AI and automation agency helping businesses scale with intelligent digital architecture and automated workflows."
        keywords="astrix, ai agency, web design, automation agency, business automation, react web development, intelligent workflows, enterprise ai solutions, astrix web services"
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
          <div className="badge">ENTERPRISE SOLUTIONS</div>
          <h1 className="hero-title">
            Transforming Business <br />
            <span className="text-brand">Through Automation</span>
          </h1>
          <p className="hero-subtitle">
            ASTRIX pioneers intelligent automation and digital architecture to streamline operations, enhance security, and drive measurable growth for modern enterprises.
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
              <BarChart2 size={24} color="var(--brand-blue)" />
            </div>
            <h3>Data-Driven Growth</h3>
            <p>Leverage analytics to scale your operations predictably.</p>
          </div>
          
          <div className="feature-card card-clean fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="icon-wrapper">
              <Zap size={24} color="var(--brand-blue)" />
            </div>
            <h3>Rapid Automation</h3>
            <p>Deploy AI-driven workflows that eliminate manual bottlenecks.</p>
          </div>

          <div className="feature-card card-clean fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="icon-wrapper">
              <Shield size={24} color="var(--brand-blue)" />
            </div>
            <h3>Enterprise Security</h3>
            <p>Robust architectures designed to protect your critical data.</p>
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
          Contact Sales
        </button>
      </motion.div>
    </div>
  );
}
