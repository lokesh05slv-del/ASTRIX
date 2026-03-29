import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Terminal, ShieldCheck } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import './Contact.css';

export default function Contact() {
  const [state, handleSubmit] = useForm(import.meta.env.VITE_FORMSPREE_ID || "mvzvkrwn");

  if (state.succeeded) {
    return (
      <div className="contact-page">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="contact-container glass-panel success-view">
          <ShieldCheck size={80} color="var(--jarvis-blue)" className="glow-icon pulse-anim" />
          <h1 className="mono glow-text" style={{ marginTop: '2rem' }}>Transmission Received</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginTop: '1rem' }}>
            Your data has been securely routed. Our team will contact you shortly.
          </p>
          <button onClick={() => window.location.reload()} className="submit-btn mono glow-button" style={{ marginTop: '2rem' }}>
            Send Another
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="contact-page">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="contact-container glass-panel">
        <div className="contact-header">
          <Terminal className="glow-icon" color="var(--jarvis-blue)" size={40} />
          <h1 className="mono glow-text">Contact Us</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Send us a message and we'll get back to you securely.</p>
        </div>

        <div className="contact-grid">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="mono" htmlFor="full-name">Full Name</label>
              <input id="full-name" name="name" type="text" placeholder="Your name" required maxLength="100" />
              <ValidationError prefix="Name" field="name" errors={state.errors} />
            </div>
            <div className="input-group">
              <label className="mono" htmlFor="email">Email Address</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="Enter your transmission address..."
                required
                maxLength="100"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Please enter a valid email address."
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>
            <div className="input-group">
              <label className="mono" htmlFor="message">Your Message</label>
              <textarea 
                id="message" 
                name="message" 
                placeholder="Describe your requirements..." 
                rows="4" 
                required
                maxLength="2000"
              ></textarea>
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>
            <button className="submit-btn mono glow-button" type="submit" disabled={state.submitting}>
              {state.submitting ? "Transmitting..." : "Send Message"}
            </button>
          </form>

          <div className="contact-methods">
            <h3 className="mono glow-text" style={{ marginBottom: '1.5rem' }}>Direct Channels</h3>
            
            <a href="https://wa.me/919740748678" target="_blank" rel="noopener noreferrer" className="method-card glass-panel" style={{ textDecoration: 'none', color: 'inherit' }}>
              <MessageSquare color="#25D366" size={32} style={{ filter: 'drop-shadow(0 0 10px rgba(37,211,102,0.8))' }} />
              <div>
                <h4 className="mono" style={{ color: '#25D366' }}>WhatsApp</h4>
                <p>Instant Node</p>
              </div>
            </a>

            <a href="mailto:loki05slv@gmail.com" className="method-card glass-panel" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Mail color="var(--jarvis-blue)" size={32} className="glow-icon" />
              <div>
                <h4 className="mono" style={{ color: 'var(--text-secondary)' }}>Email</h4>
                <p>Async Node</p>
              </div>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
