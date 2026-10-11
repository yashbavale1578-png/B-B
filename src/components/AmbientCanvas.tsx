import React, { useEffect, useRef } from 'react';

/**
 * ThreeUI-Inspired Ambient Fluid & Craft Amber Shader Canvas
 * Renders atmospheric amber bubbles and deep burgundy caustic light waves
 * Responsive to subtle mouse interaction with automatic fallback for reduced motion.
 */
export const AmbientCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle representation of micro-carbonation bubbles
    const bubbleCount = Math.min(30, Math.floor(width / 50));
    const bubbles: {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      opacity: number;
      color: string;
    }[] = [];

    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 1 + Math.random() * 2.5,
        speedY: 0.3 + Math.random() * 0.7,
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: 0.15 + Math.random() * 0.35,
        color: Math.random() > 0.4 ? 'rgba(185, 154, 98, ' : 'rgba(121, 45, 67, '
      });
    }

    let time = 0;

    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      // Render deep burgundy / warm amber subtle gradient orbs (caustics)
      const grad1 = ctx.createRadialGradient(
        width * 0.2 + Math.sin(time * 0.5) * 80,
        height * 0.3 + Math.cos(time * 0.4) * 60,
        0,
        width * 0.2,
        height * 0.3,
        width * 0.45
      );
      grad1.addColorStop(0, 'rgba(84, 26, 43, 0.22)');
      grad1.addColorStop(1, 'rgba(17, 17, 17, 0)');

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.8 + Math.cos(time * 0.6) * 70,
        height * 0.7 + Math.sin(time * 0.5) * 50,
        0,
        width * 0.8,
        height * 0.7,
        width * 0.4
      );
      grad2.addColorStop(0, 'rgba(185, 154, 98, 0.12)');
      grad2.addColorStop(1, 'rgba(17, 17, 17, 0)');

      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Render ascending effervescence bubbles
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        b.y -= b.speedY;
        b.x += b.speedX + Math.sin(time + i) * 0.2;

        if (b.y < -10) {
          b.y = height + 10;
          b.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${b.color}${b.opacity})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="ambient-canvas-wrapper" aria-hidden="true">
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
};
