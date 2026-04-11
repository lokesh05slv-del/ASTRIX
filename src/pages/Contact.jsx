import React from 'react';
import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { Mail, MessageSquare, Briefcase, ArrowRight, Phone, MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';
import './Contact.css';

export default function Contact() {
  const [state, handleSubmit] = useForm("mbdpypyd");

  return (
    <div className="contact-page page-container">
      <SEO 
        title="Contact Technical Sales & Consulting" 
        description="Schedule a technical consultation with Astrix. Our expert engineers provide strategic advice on AI automation and digital architecture for your enterprise."
        canonical="/contact"
        keywords="technical consultation, business automation inquiry, AI agency contact, enterprise sales"
      />
      <div className="hero-background">
        <div className="blob blob-1"></div>
      </div>

      <div className="contact-container">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="contact-header fade-in"
        >
          <div className="badge">PARTNERSHIP INQUIRY</div>
          <h1 className="hero-title">Contact <span className="text-brand">Sales</span></h1>
          <p className="hero-subtitle">
            Provide the details of your enterprise requirements. Our technical sales team will review your inquiry and schedule a strategic consultation.
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="contact-info fade-in"
          >
            <div className="info-card card-clean">
              <div className="info-item">
                <div className="icon-wrapper">
                  <Mail size={24} color="var(--brand-blue)" />
                </div>
                <div>
                  <h3>Direct Email</h3>
                  <p><a href="mailto:astrix.webandautomation@gmail.com" className="contact-link">astrix.webandautomation@gmail.com</a></p>
                </div>
              </div>
              <div className="info-item">
                <div className="icon-wrapper">
                  <Phone size={24} color="var(--brand-blue)" />
                </div>
                <div>
                  <h3>Direct Contact</h3>
                  <p><a href="tel:+919740748678" className="contact-link">9740748678</a></p>
                </div>
              </div>
              <a href="https://wa.me/919740748678" target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <MessageCircle size={20} />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="form-wrapper fade-in"
          >
            {state.succeeded ? (
              <div className="success-message card-clean">
                <h2>Message Received</h2>
                <p>A confirmation email has been dispatched. Our team will contact you within 24 hours.</p>
                <button className="btn-secondary" onClick={() => window.location.reload()} style={{ marginTop: '1rem' }}>
                  Submit New Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form card-clean">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your name"
                    className="form-control"
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Work Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="your.name@company.com"
                    className="form-control"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    className="form-control"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">Project Requirements</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Describe your operational bottlenecks or technical objectives..."
                    className="form-control textarea"
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>

                <button 
                  type="submit" 
                  disabled={state.submitting}
                  className="btn-primary form-submit full-width"
                >
                  {state.submitting ? 'Authenticating...' : 'Submit Inquiry'} <ArrowRight size={18} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
