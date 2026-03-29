import React from 'react';
import { NavLink, Link } from 'react-router-dom';
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
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
        <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Services</NavLink>
        <NavLink to="/process" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Process</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact</NavLink>
      </div>
    </nav>
  );
}
