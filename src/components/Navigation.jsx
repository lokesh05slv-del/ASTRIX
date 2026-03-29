import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, Grid, Route, Mail, Activity } from 'lucide-react';
import Waveform from './Waveform';
import './Navigation.css';

export default function Navigation() {
  const [time, setTime] = React.useState('00:00:00');
  const [displayTask, setDisplayTask] = React.useState('');
  const [taskIndex, setTaskIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);
  
  const tasks = [
    'UPDATE_YOURSELF',
    'GROW_YOUR_BUSINESS',
    'AI_DRIVEN_EXCELLENCE',
    'NEURAL_LINK_STABLE',
    'SECURE_LEADS_SYNC'
  ];

  // System Clock
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Neural Typewriter Console
  React.useEffect(() => {
    const currentFullTask = tasks[taskIndex];
    const typingSpeed = isDeleting ? 40 : 100;
    const pauseTime = isDeleting ? 200 : 2000;

    const handleType = () => {
      if (!isDeleting && charIndex < currentFullTask.length) {
        setDisplayTask(currentFullTask.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayTask(currentFullTask.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      } else if (!isDeleting && charIndex === currentFullTask.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTaskIndex(prev => (prev + 1) % tasks.length);
      }
    };

    const typeTimer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(typeTimer);
  }, [charIndex, isDeleting, taskIndex]);

  return (
    <>
      <nav className="glass-panel nav-container top-bar">
        <Link to="/" className="nav-logo-link" style={{ textDecoration: 'none' }}>
          <div className="nav-logo glow-text mono">
             <img src="/logo.png" alt="Astrix Logo" className="logo-img" />
          </div>
        </Link>

        {/* --- NEURAL CONSOLE 2.0 (Typewriter Display) --- */}
        <div className="ribbon-dynamics desktop-only">
          <div className="dynamics-console">
            <Activity className="pulse-icon" size={14} color="var(--jarvis-blue)" />
            <div className="console-display">
              <span className="typewriter-text mono">
                {displayTask}<span className="cursor">_</span>
              </span>
            </div>
            <div className="dynamics-divider" />
            <Waveform />
            <div className="dynamics-divider" />
            <span className="system-time mono">{time}</span>
          </div>
        </div>

        {/* Mobile Mini Indicator */}
        <div className="mobile-only mobile-dynamics">
          <Activity className="pulse-icon" size={16} color="var(--jarvis-blue)" />
        </div>
      </nav>

      <div className="nav-links main-navigation">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <Home className="nav-icon" size={24} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <Grid className="nav-icon" size={24} />
          <span>Services</span>
        </NavLink>
        <NavLink to="/process" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <Route className="nav-icon" size={24} />
          <span>Process</span>
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <Mail className="nav-icon" size={24} />
          <span>Contact</span>
        </NavLink>
      </div>
    </>
  );
}
