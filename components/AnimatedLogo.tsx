'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AnimatedLogo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-20 h-20 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Outer rotating ring */}
      <motion.div
        className="absolute inset-0 border-4 border-transparent border-t-cyan-500 border-r-purple-500 rounded-full"
        animate={{
          rotate: isHovered ? 360 : 0,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Inner pulsing circle */}
      <motion.div
        className="absolute inset-2 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center"
        animate={{
          scale: isHovered ? [1, 1.1, 1] : 1,
        }}
        transition={{
          duration: 1,
          repeat: isHovered ? Infinity : 0,
        }}
      >
        <motion.div
          className="text-white font-bold text-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          SDP
        </motion.div>
      </motion.div>
      
      {/* Particle effects */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400 rounded-full"
          style={{
            top: '50%',
            left: '50%',
          }}
          animate={
            isHovered
              ? {
                  x: Math.cos((i * Math.PI * 2) / 6) * 40,
                  y: Math.sin((i * Math.PI * 2) / 6) * 40,
                  opacity: [0, 1, 0],
                }
              : { x: 0, y: 0, opacity: 0 }
          }
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            delay: i * 0.1,
          }}
        />
      ))}
    </motion.div>
  );
}
