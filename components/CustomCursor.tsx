'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface CursorDot {
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [dots, setDots] = useState<CursorDot[]>(Array(8).fill({ x: 0, y: 0 }));
  const dotsRef = useRef<CursorDot[]>(Array(8).fill({ x: 0, y: 0 }));
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [data-cursor-hover]');
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Animated following dots
    const animateDots = () => {
      dotsRef.current = dotsRef.current.map((dot, index) => {
        const targetX = index === 0 ? mousePosition.x : dotsRef.current[index - 1].x;
        const targetY = index === 0 ? mousePosition.y : dotsRef.current[index - 1].y;
        
        const friction = 0.15 - index * 0.01; // Each dot is slower
        
        return {
          x: dot.x + (targetX - dot.x) * friction,
          y: dot.y + (targetY - dot.y) * friction,
        };
      });
      
      setDots([...dotsRef.current]);
      animationFrameRef.current = requestAnimationFrame(animateDots);
    };

    animationFrameRef.current = requestAnimationFrame(animateDots);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePosition.x, mousePosition.y]);

  return (
    <>
      {/* Main cursor - geometric shape */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.3 : 1,
          rotate: isHovering ? 45 : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          {/* Diamond shape */}
          <div
            className="w-6 h-6 rotate-45 bg-gradient-to-br from-cyan-400 to-purple-500"
            style={{
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.6), 0 0 40px rgba(168, 85, 247, 0.4)',
            }}
          />
          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 w-6 h-6 rotate-45 border-2 border-cyan-400"
            animate={isHovering ? {
              scale: [1, 1.8, 1],
              opacity: [0.8, 0, 0.8],
            } : {}}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        </div>
      </motion.div>

      {/* Following dots trail */}
      {dots.map((dot, index) => {
        const size = 4 - index * 0.3;
        const opacity = 1 - index * 0.12;
        const colors = [
          'rgba(6, 182, 212, 0.8)',   // cyan
          'rgba(34, 211, 238, 0.7)',  // cyan lighter
          'rgba(103, 232, 249, 0.6)', // cyan very light
          'rgba(168, 85, 247, 0.6)',  // purple
          'rgba(192, 132, 252, 0.5)', // purple lighter
          'rgba(216, 180, 254, 0.4)', // purple very light
          'rgba(236, 72, 153, 0.3)',  // pink
          'rgba(244, 114, 182, 0.2)', // pink lighter
        ];

        return (
          <motion.div
            key={index}
            className="fixed pointer-events-none z-[9998]"
            style={{
              left: dot.x - size / 2,
              top: dot.y - size / 2,
              width: size,
              height: size,
              opacity: opacity,
            }}
          >
            {/* Diamond/pointed shape */}
            <div
              className="w-full h-full rotate-45"
              style={{
                backgroundColor: colors[index],
                boxShadow: `0 0 ${8 - index}px ${colors[index]}`,
              }}
            />
          </motion.div>
        );
      })}

      {/* Outer circle on hover */}
      {isHovering && (
        <motion.div
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="w-12 h-12 rounded-full border-2"
              style={{
                borderImage: 'linear-gradient(45deg, #06b6d4, #a855f7) 1',
                borderColor: 'transparent',
                borderStyle: 'solid',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-full h-full rounded-full border-2 border-cyan-400/30" />
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Click ripple effect */}
      {isClicking && (
        <motion.div
          className="fixed pointer-events-none z-40"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
          }}
        >
          <motion.div
            className="relative -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-cyan-400"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </>
  );
}
