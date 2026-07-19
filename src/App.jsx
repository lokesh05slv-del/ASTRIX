import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Process from './pages/Process';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import { AuroraBackground } from './components/ui/aurora-background';
import { SoftBubbles } from './components/ui/SoftBubbles';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:serviceId" element={<ServiceDetail />} />
        <Route path="/process" element={<Process />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:projectId" element={<ProjectDetail />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AuroraBackground />
      <SoftBubbles />
      <ScrollToTop />
      <Navigation />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
