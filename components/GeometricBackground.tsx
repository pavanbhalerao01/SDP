'use client';

import { useEffect, useRef } from 'react';

interface Shape {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: 'square' | 'triangle' | 'hexagon';
  color: string;
}

export default function GeometricBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const shapes: Shape[] = [];
    const colors = [
      'rgba(6, 182, 212, 0.15)',
      'rgba(168, 85, 247, 0.15)',
      'rgba(236, 72, 153, 0.12)',
    ];
    const types: Shape['type'][] = ['square', 'triangle', 'hexagon'];

    // Create shapes
    for (let i = 0; i < 15; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 80 + 40,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        opacity: Math.random() * 0.3 + 0.1,
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const drawSquare = (shape: Shape) => {
      ctx.save();
      ctx.translate(shape.x, shape.y);
      ctx.rotate(shape.rotation);
      ctx.strokeStyle = shape.color;
      ctx.lineWidth = 2;
      ctx.globalAlpha = shape.opacity;
      ctx.strokeRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
      ctx.restore();
    };

    const drawTriangle = (shape: Shape) => {
      ctx.save();
      ctx.translate(shape.x, shape.y);
      ctx.rotate(shape.rotation);
      ctx.strokeStyle = shape.color;
      ctx.lineWidth = 2;
      ctx.globalAlpha = shape.opacity;
      ctx.beginPath();
      ctx.moveTo(0, -shape.size / 2);
      ctx.lineTo(shape.size / 2, shape.size / 2);
      ctx.lineTo(-shape.size / 2, shape.size / 2);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    };

    const drawHexagon = (shape: Shape) => {
      ctx.save();
      ctx.translate(shape.x, shape.y);
      ctx.rotate(shape.rotation);
      ctx.strokeStyle = shape.color;
      ctx.lineWidth = 2;
      ctx.globalAlpha = shape.opacity;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const x = Math.cos(angle) * shape.size / 2;
        const y = Math.sin(angle) * shape.size / 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    };

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach((shape) => {
        shape.rotation += shape.rotationSpeed;

        if (shape.type === 'square') drawSquare(shape);
        else if (shape.type === 'triangle') drawTriangle(shape);
        else if (shape.type === 'hexagon') drawHexagon(shape);
      });

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
