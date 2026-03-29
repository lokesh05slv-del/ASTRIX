import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './ChatBot.css';

// Initialize Gemini - key loaded from .env or fallback for local dev
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyD6D1eUOsef45GntKyeiRO8IyAgnUGA62Y';
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Astrix AI Assistant online. How may I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const promptText = `You are Astrix AI, a highly advanced, futuristic, and professional AI assistant for the web development and automation agency "Astrix". 
      The agency specializes in website building and automation of business leads using WhatsApp and emails.
      Keep your answers concise, professional, and slightly sci-fi but very helpful. Do not use markdown backticks for code unless asked.
      User's query: ${userMsg}`;

      let responseText = "";

      // Smart routing: Use direct API for local dev, use secure backend for production
      if (import.meta.env.PROD) {
        const res = await fetch('/.netlify/functions/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: promptText })
        });
        
        if (!res.ok) throw new Error('Secure Proxy Failed');
        const data = await res.json();
        
        // Extract text from Netlify Function response format
        responseText = data.response || "No response generated.";
      } else {
        const result = await model.generateContent(promptText);
        responseText = result.response.text();
      }

      setMessages(prev => [...prev, { role: 'ai', text: responseText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: 'Connection to Astrix neural proxy failed. Please try again later.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <div className="chatbot-toggle" onClick={() => setIsOpen(true)}>
        <div className="bot-ring"></div>
        <Bot size={30} color="var(--jarvis-blue)" className="glow-icon" />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="chatbot-window glass-panel"
          >
            <div className="chat-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Bot size={24} color="var(--jarvis-blue)" />
                <span className="mono glow-text">Astrix AI</span>
              </div>
              <X size={24} style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
            </div>

            <div className="chat-body">
              {messages.map((msg, idx) => (
                <div key={idx} className={`chat-message ${msg.role}`}>
                  <div className="msg-bubble">{msg.text}</div>
                </div>
              ))}
              {isTyping && (
                <div className="chat-message ai">
                  <div className="msg-bubble typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-footer">
              <input 
                type="text" 
                placeholder="Query system..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend}><Send size={20} color="var(--jarvis-blue)" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
