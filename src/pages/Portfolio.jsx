import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import './Portfolio.css';

const projects = [];

export default function Portfolio() {
  const navigate = useNavigate();
  return (
    <div className="portfolio-page page-container">
      <SEO 
        title="Our Work | Astrix Portfolio" 
        description="Explore our latest projects showcasing our expertise in premium web design, brand identity, and UI/UX."
      />
      
      <div className="portfolio-header fade-in">
        <h1 className="portfolio-title">Selected <span className="text-brand">Works</span></h1>
        <p className="portfolio-subtitle">
          A showcase of our capabilities. We partner with ambitious brands to create digital experiences that inspire and perform.
        </p>
      </div>

      <div className="portfolio-grid">
        {projects.map((project, index) => (
          <motion.div 
            className="portfolio-card"
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={() => navigate(`/portfolio/${project.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <div className="portfolio-image-wrapper">
              <img src={project.image} alt={project.title} className="portfolio-image" loading="lazy" />
              <div className="portfolio-overlay">
                <button className="view-project-btn">
                  View Details <ArrowUpRight size={20} />
                </button>
              </div>
            </div>
            <div className="portfolio-info">
              <p className="portfolio-category">{project.category}</p>
              <h3 className="portfolio-name">{project.title}</h3>
              <p className="portfolio-desc">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="portfolio-cta fade-in" style={{ animationDelay: '0.8s' }}>
        <h2>Ready to start your project?</h2>
        <button className="btn-primary" onClick={() => window.location.href = '/contact'}>
          Let's Talk
        </button>
      </div>
    </div>
  );
}
