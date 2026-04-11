import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, Grid, Route as RouteIcon, Mail, Star } from 'lucide-react';
import './Navigation.css';

export default function Navigation() {
  return (
    <>
      <header className="nav-header fade-in">
        <div className="nav-container">
          <Link to="/" className="nav-logo-link">
            <div className="nav-logo text-brand">
               ASTRIX
            </div>
          </Link>
  
          {/* Desktop Navigation */}
          <nav className="main-navigation desktop-only">
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span>HOME</span>
            </NavLink>
            <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span>SERVICES</span>
            </NavLink>
            <NavLink to="/process" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span>PROCESS</span>
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span>CONTACT</span>
            </NavLink>
            <NavLink to="/review" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span>REVIEW</span>
            </NavLink>
          </nav>
        </div>
      </header>
  
      {/* Mobile Bottom Navigation */}
      <nav className="mobile-navigation mobile-only">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <Home className="nav-icon" size={20} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <Grid className="nav-icon" size={20} />
          <span>Services</span>
        </NavLink>
        <NavLink to="/process" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <RouteIcon className="nav-icon" size={20} />
          <span>Process</span>
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <Mail className="nav-icon" size={20} />
          <span>Contact</span>
        </NavLink>
        <NavLink to="/review" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <Star className="nav-icon" size={20} />
          <span>Review</span>
        </NavLink>
      </nav>
    </>
  );
}
