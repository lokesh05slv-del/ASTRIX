import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Lock, Mail, KeyRound, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';
import './Auth.css';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  const handleAuth = (e) => {
    e.preventDefault();
    setIsScanning(true);
    
    // Simulate biometric scan/auth processing
    setTimeout(() => {
      setIsScanning(false);
      setAuthSuccess(true);
    }, 2500);
  };

  if (authSuccess) {
    return (
      <div className="auth-page">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="success-panel glass-panel">
          <ShieldCheck size={80} color="#00f0ff" className="glow-icon pulse-anim" />
          <h2 className="mono glow-text" style={{ marginTop: '1rem', fontSize: '2rem' }}>ACCESS GRANTED</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Security clearance level: ALPHA.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <SEO 
        title="Security Access" 
        description="Securely access the Astrix enterprise dashboard. Authorized personnel only."
        canonical="/auth"
        noindex={true}
      />
      <div className="auth-container glass-panel">
        <div className="auth-header">
          <Lock className="glow-icon" color="var(--jarvis-blue)" size={40} />
          <h1 className="mono glow-text">ASTRIX SECURITY</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Identify yourself to access core systems.</p>
        </div>

        <div className="auth-toggle">
          <button className={`toggle-btn mono ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>Login</button>
          <button className={`toggle-btn mono ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)}>Sign Up</button>
        </div>

        <AnimatePresence mode="wait">
          {isScanning ? (
            <motion.div 
              key="scanner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="scanner-container"
            >
              <div className="scanner-line"></div>
              <Fingerprint size={80} color="var(--jarvis-blue)" className="glow-icon pulse-anim" />
              <p className="mono glow-text" style={{ marginTop: '1rem' }}>VERIFYING CREDENTIALS...</p>
            </motion.div>
          ) : (
            <motion.form 
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="auth-form" 
              onSubmit={handleAuth}
            >
              {!isLogin && (
                <div className="input-group">
                  <label className="mono"><KeyRound size={14} color="var(--jarvis-blue)" /> Full Name</label>
                  <input type="text" placeholder="John Doe" required />
                </div>
              )}
              
              <div className="input-group">
                <label className="mono"><Mail size={14} color="var(--jarvis-blue)" /> Email Address</label>
                <input type="email" placeholder="agent@astrix.com" required />
              </div>
              
              <div className="input-group">
                <label className="mono"><KeyRound size={14} color="var(--jarvis-blue)" /> Security Key</label>
                <input type="password" placeholder="••••••••••••" required />
              </div>

              <button type="submit" className="submit-btn mono glow-button" style={{ marginTop: '1rem' }}>
                {isLogin ? 'Initialize Uplink' : 'Register Node'}
              </button>

              <div className="divider">
                <span>OR</span>
              </div>

              <button type="button" className="oauth-btn mono" onClick={handleAuth}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" style={{width: '20px', height: '20px'}} />
                G-Connect OAuth
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
