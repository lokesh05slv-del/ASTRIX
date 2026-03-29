import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, Grid, Route, Mail } from 'lucide-react';
import './Navigation.css';

export default function Navigation() {
  return (
    <nav className="glass-panel nav-container">
      <Link to="/" className="nav-logo-link" style={{ textDecoration: 'none' }}>
        <div className="nav-logo glow-text mono">
           <img src="/logo.png" alt="Astrix Logo" className="logo-img" />
        </div>
      </Link>
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <Home className="nav-icon" size={20} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <Grid className="nav-icon" size={20} />
          <span>Services</span>
        </NavLink>
        <NavLink to="/process" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <Route className="nav-icon" size={20} />
          <span>Process</span>
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <Mail className="nav-icon" size={20} />
          <span>Contact</span>
        </NavLink>
      </div>
    </nav>
  );
}
