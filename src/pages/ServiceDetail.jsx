import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, GitMerge, Bot, ArrowLeft, CheckCircle } from 'lucide-react';
import './ServiceDetail.css';

const serviceData = {
  'web-development': {
    title: 'Website Development',
    icon: Code,
    description: 'High-performance, visually stunning architectures specifically built for conversion.',
    improvement: 'Our web solutions are engineered to load instantly and engage users immediately. By integrating immersive 3D elements and optimized React/Next.js architectures, we reduce bounce rates and increase customer trust, directly impacting your bottom line.',
    features: [
      'Next.js & React High-Performance Apps',
      'Three.js Immersive 3D Experiences',
      'SEO Optimized Structure',
      'Conversion Rate Optimization (CRO)',
      'Responsive & Mobile-First Design'
    ]
  },
  'automation-systems': {
    title: 'Automation Systems',
    icon: GitMerge,
    description: 'WhatsApp, Email, and internal CRM syncing for seamless operations.',
    improvement: 'Stop wasting time on repetitive tasks. Our automation pipelines handle lead nurturing, data entry, and multi-channel communication silently in the background. This allows your team to focus on high-value strategy while the system scales your operations.',
    features: [
      'WhatsApp API Integration',
      'Automated Lead Nurturing',
      'CRM Data Synchronization',
      'Custom Workflow Hooks',
      'Error-Resilient Data Pipelines'
    ]
  },
  'ai-solutions': {
    title: 'AI Solutions',
    icon: Bot,
    description: 'Integrating large language models directly into your business logic.',
    improvement: 'Leverage the power of AI to analyze data, automate customer support, and generate content. Our AI implementations go beyond simple chatbots; we build intelligent agents that understand your business logic and provide actionable insights.',
    features: [
      'Custom LLM Integration (GPT-4, Gemini)',
      'Intelligent Document Processing',
      'AI-Driven Predictive Analytics',
      'Automated Support Agents',
      'Semantic Search Implementation'
    ]
  }
};

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const service = serviceData[serviceId];

  if (!service) {
    return (
      <div className="page-container" style={{ textAlign: 'center', paddingTop: '200px' }}>
        <h1 className="glow-text">Service Not Found</h1>
        <button className="back-btn" onClick={() => navigate('/services')}>Back to Services</button>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="service-detail-page page-container">
      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="back-btn mono" 
        onClick={() => navigate('/services')}
      >
        <ArrowLeft size={18} /> BACK_TO_SYSTEMS
      </motion.button>

      <div className="detail-content">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="detail-header"
        >
          <div className="icon-wrapper">
            <Icon size={64} className="glow-icon" color="var(--jarvis-blue)" />
          </div>
          <h1 className="glow-text mono">{service.title}</h1>
          <p className="lead-text">{service.description}</p>
        </motion.div>

        <div className="detail-grid">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel business-improvement"
          >
            <h2 className="mono glow-text">Business Impact</h2>
            <p>{service.improvement}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel core-features"
          >
            <h2 className="mono glow-text">Core Capabilities</h2>
            <ul>
              {service.features.map((feature, index) => (
                <li key={index}>
                  <CheckCircle size={16} color="var(--jarvis-blue)" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="cta-section"
        >
          <h3 className="mono">Ready to optimize your business?</h3>
          <button 
            className="contact-trigger-btn mono"
            onClick={() => navigate('/contact')}
          >
            INITIATE_CONTACT_SEQUENCE
          </button>
        </motion.div>
      </div>
    </div>
  );
}
