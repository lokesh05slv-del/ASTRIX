import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import './ProjectDetail.css';

export const projectsData = [];

export default function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const foundProject = projectsData.find(p => p.id === projectId);
    if (foundProject) {
      setProject(foundProject);
    } else {
      navigate('/portfolio');
    }
  }, [projectId, navigate]);

  if (!project) return null;

  return (
    <div className="project-detail-page page-container">
      <SEO 
        title={`${project.title} | Astrix Work`} 
        description={project.description}
      />
      
      <div className="detail-container">
        <button className="back-btn" onClick={() => navigate('/portfolio')}>
          <ArrowLeft size={20} /> Back to Portfolio
        </button>
        
        <motion.div 
          className="detail-header fade-in"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="detail-category">{project.category}</span>
          <h1 className="detail-title">{project.title}</h1>
        </motion.div>
        
        <motion.div 
          className="detail-hero-image"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img src={project.image} alt={project.title} />
        </motion.div>
        
        <motion.div 
          className="detail-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="detail-description">
            <h2>About the Project</h2>
            <p>{project.description}</p>
          </div>
          
          <div className="detail-meta">
            <div className="meta-box">
              <h3>Client</h3>
              <p>{project.client}</p>
            </div>
            <div className="meta-box">
              <h3>Timeline</h3>
              <p>{project.timeline}</p>
            </div>
            <div className="meta-box">
              <h3>Services</h3>
              <ul>
                {project.services.map(s => <li key={s}>{s}</li>)}
              </ul>
            </div>
          </div>
        </motion.div>
        
        <div className="launch-section fade-in" style={{ animationDelay: '0.6s' }}>
          <button className="btn-primary" onClick={() => alert("This is a demo. The live project would launch here.")}>
            Visit Live Site <ExternalLink size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
