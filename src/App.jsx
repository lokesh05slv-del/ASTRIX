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
import Review from './pages/Review';
import { TubeCursor } from './components/ui/tube-cursor';


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
        <Route path="/review" element={<Review />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <TubeCursor />
      <ScrollToTop />
      <Navigation />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
