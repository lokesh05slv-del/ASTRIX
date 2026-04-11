import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, GitMerge, Bot, ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import './ServiceDetail.css';

const serviceData = {
  'web-development': {
    title: 'Digital Platforms',
    icon: Code,
    description: 'High-performance, secure web applications built for conversion.',
    improvement: 'Our digital platforms are engineered to load instantly and engage users immediately. By integrating optimized architectures, we reduce bounce rates and increase customer trust, directly impacting your bottom line.',
    features: [
      'Next.js & React High-Performance Apps',
      'Modern, professional UX/UI Design',
      'Technical SEO Optimized Structure',
      'Conversion Rate Optimization (CRO)',
      'Enterprise-grade Security & Scalability'
    ]
  },
  'automation-systems': {
    title: 'Process Automation',
    icon: GitMerge,
    description: 'Custom CRM syncing and data pipelines for seamless operations.',
    improvement: 'Stop wasting time on repetitive tasks. Our automation pipelines handle lead nurturing, data entry, and multi-channel communication silently in the background. This allows your team to focus on high-value strategy while the system scales your operations.',
    features: [
      'Enterprise API Integration',
      'Automated Lead Nurturing Workflows',
      'CRM Data Synchronization',
      'Custom Internal Tooling',
      'Error-Resilient Data Pipelines'
    ]
  },
  'ai-solutions': {
    title: 'Applied AI Solutions',
    icon: Bot,
    description: 'Integrating large language models directly into your business logic.',
    improvement: 'Leverage the power of AI to analyze data, automate customer support, and process large volumes of information. We build intelligent digital agents that understand your business logic and provide actionable insights.',
    features: [
      'Custom LLM Integration (GPT-4, Claude)',
      'Intelligent Document Processing',
      'AI-Driven Predictive Analytics',
      'Automated Tier-1 Support Agents',
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
      <div className="page-container" style={{ textAlign: 'center', paddingTop: '20vh' }}>
        <h2>Service Not Found</h2>
        <button className="btn-secondary" style={{ marginTop: '2rem' }} onClick={() => navigate('/services')}>Back to Capabilities</button>
      </div>
    );
  }

  const Icon = service.icon;

  const siteUrl = 'https://astrix-webservices.netlify.app';

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": `${siteUrl}/services`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": `${siteUrl}/services/${serviceId}`
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.title,
    "provider": {
      "@type": "Organization",
      "name": "Astrix",
      "url": siteUrl
    },
    "description": service.description,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "ASTRIX Solutions",
      "itemListElement": service.features.map(feature => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": feature
        }
      }))
    }
  };

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, serviceSchema]
  };

  return (
    <div className="service-detail-page page-container">
      <SEO 
        title={`${service.title} Solutions`}
        description={`${service.title} services by Astrix. ${service.description}`}
        canonical={`/services/${serviceId}`}
        schemaData={combinedSchema}
      />
      <div className="detail-hero-background"></div>
      
      <div className="detail-container">
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="back-btn fade-in" 
          onClick={() => navigate('/services')}
        >
          <ArrowLeft size={16} /> Back to Capabilities
        </motion.button>

        <div className="detail-hero">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="detail-header fade-in"
          >
            <div className="icon-wrapper detail-icon">
              <Icon size={40} color="var(--brand-blue)" />
            </div>
            <h1 className="hero-title">{service.title}</h1>
            <p className="hero-subtitle" style={{textAlign: 'left', margin: '0'}}>{service.description}</p>
          </motion.div>
        </div>

        <div className="detail-grid">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-clean impact-card fade-in"
          >
            <h2 className="section-title">Business Impact</h2>
            <p className="impact-text">{service.improvement}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-clean capabilities-card fade-in"
          >
            <h2 className="section-title">Core Capabilities</h2>
            <ul className="capabilities-list">
              {service.features.map((feature, index) => (
                <li key={index}>
                  <CheckCircle size={20} color="var(--brand-blue)" className="check-icon" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="detail-cta card-clean fade-in"
        >
          <div className="cta-content">
            <h2>Ready to optimize your operations?</h2>
            <p>Schedule a technical consultation to discuss implementation strategies for your enterprise.</p>
          </div>
          <button 
            className="btn-primary"
            onClick={() => navigate('/contact')}
          >
            Contact Sales <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
