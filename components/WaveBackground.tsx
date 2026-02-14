'use client';

import { useEffect, useRef } from 'react';

export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrameId: number;
    let time = 0;

    const waves = [
      { amplitude: 30, frequency: 0.01, speed: 0.02, color: 'rgba(6, 182, 212, 0.1)' },
      { amplitude: 40, frequency: 0.008, speed: 0.015, color: 'rgba(168, 85, 247, 0.1)' },
      { amplitude: 25, frequency: 0.012, speed: 0.025, color: 'rgba(236, 72, 153, 0.08)' },
    ];

    const drawWave = (wave: typeof waves[0], offset: number) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);

      for (let x = 0; x < canvas.width; x++) {
        const y = 
          canvas.height / 2 + 
          Math.sin(x * wave.frequency + time * wave.speed + offset) * wave.amplitude;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fillStyle = wave.color;
      ctx.fill();
    };

    const drawGradientOrbs = () => {
      const orbs = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, size: 300, color: 'rgba(6, 182, 212, 0.05)' },
        { x: canvas.width * 0.7, y: canvas.height * 0.6, size: 400, color: 'rgba(168, 85, 247, 0.05)' },
        { x: canvas.width * 0.5, y: canvas.height * 0.8, size: 350, color: 'rgba(236, 72, 153, 0.03)' },
      ];

      orbs.forEach((orb) => {
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.size);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw gradient orbs
      drawGradientOrbs();
      
      // Draw waves
      waves.forEach((wave, index) => {
        drawWave(wave, index * Math.PI / 3);
      });

      time += 0.5;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ background: 'transparent' }}
    />
  );
}
