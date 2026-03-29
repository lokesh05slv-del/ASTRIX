import React, { useEffect, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);
    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, input, textarea, .chatbot-toggle').forEach(el => {
        el.addEventListener('mouseover', () => setLinkHovered(true));
        el.addEventListener('mouseout', () => setLinkHovered(false));
      });
    };

    addEventListeners();
    handleLinkHoverEvents();

    // Re-bind listeners when DOM changes due to routing
    const observer = new MutationObserver(handleLinkHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      removeEventListeners();
      observer.disconnect();
    };
  }, []);

  // Don't show custom cursor on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  const cursorClasses = `cursor 
    ${clicked ? 'cursor-clicked' : ''} 
    ${hidden ? 'cursor-hidden' : ''} 
    ${linkHovered ? 'cursor-hover' : ''}
  `;

  return (
    <>
      <div 
        className={cursorClasses}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div 
        className={`cursor-follower ${hidden ? 'cursor-hidden' : ''} ${linkHovered ? 'cursor-hover' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  );
}
