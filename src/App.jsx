import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import ChatBot from './components/ChatBot';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import Home from './pages/Home';
import Services from './pages/Services';
import Process from './pages/Process';
import Contact from './pages/Contact';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/process" element={<Process />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <CustomCursor />
      <ParticleBackground />
      <Navigation />
      <AnimatedRoutes />
      <ChatBot />
    </Router>
  );
}

export default App;
