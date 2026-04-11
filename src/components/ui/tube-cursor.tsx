import React, { useEffect, useRef } from 'react';

export function TubeCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const isMobile = window.innerWidth < 768;

    const config = {
      tubes: {
        colors: isMobile ? ['#ff00ff', '#00ffff', '#ffff00'] : ['#f967fb', '#53bc28', '#6958d5', '#00d2ff', '#ff003c'],
        lights: {
          intensity: isMobile ? 40 : 100,
        },
      },
    };

    let colorIndex = 0;
    const mouse = { x: width / 2, y: height / 2, isActive: false };
    const current = { x: width / 2, y: height / 2 };
    
    const points: { x: number; y: number }[] = [];
    const maxPoints = 25;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isActive = true;
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      mouse.x = touch.clientX;
      mouse.y = touch.clientY;
      mouse.isActive = true;
    };

    const randomizeColors = () => {
      colorIndex = (colorIndex + 1) % config.tubes.colors.length;
    };

    // Forward both mousemove and touchmove events
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    
    // Tap / Click
    window.addEventListener('click', randomizeColors);
    window.addEventListener('touchstart', randomizeColors, { passive: true });

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      current.x += (mouse.x - current.x) * 0.1;
      current.y += (mouse.y - current.y) * 0.1;

      if (mouse.isActive) {
        points.push({ x: current.x, y: current.y });
        while (points.length > maxPoints) {
          points.shift();
        }
      }

      if (points.length > 2) {
        const currentColor = config.tubes.colors[colorIndex];

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }

        ctx.quadraticCurveTo(
          points[points.length - 1].x,
          points[points.length - 1].y,
          current.x,
          current.y
        );

        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        // Neon glow layer
        ctx.shadowBlur = config.tubes.lights.intensity;
        ctx.shadowColor = currentColor;
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = 12;
        ctx.stroke();

        // Inner glowing core
        ctx.shadowBlur = config.tubes.lights.intensity / 2;
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = 6;
        ctx.stroke();

        // White solid core
        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('click', randomizeColors);
      window.removeEventListener('touchstart', randomizeColors);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
        touchAction: 'none' 
      }} 
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
}
