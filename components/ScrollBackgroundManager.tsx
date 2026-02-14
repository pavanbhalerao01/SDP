'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveBackground from './InteractiveBackground';
import WaveBackground from './WaveBackground';
import GeometricBackground from './GeometricBackground';

export default function ScrollBackgroundManager() {
  const [activeBackground, setActiveBackground] = useState<'hero' | 'middle' | 'footer'>('hero');
  const pathname = usePathname();

  // Don't show background on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Hero section (0 to 1 viewport height)
      if (scrollPosition < windowHeight * 0.8) {
        setActiveBackground('hero');
      }
      // Footer section (last viewport height)
      else if (scrollPosition > documentHeight - windowHeight * 1.5) {
        setActiveBackground('footer');
      }
      // Middle section
      else {
        setActiveBackground('middle');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {activeBackground === 'hero' && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 -z-10"
          >
            <InteractiveBackground />
          </motion.div>
        )}

        {activeBackground === 'middle' && (
          <motion.div
            key="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 -z-10"
          >
            <WaveBackground />
          </motion.div>
        )}

        {activeBackground === 'footer' && (
          <motion.div
            key="footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 -z-10"
          >
            <GeometricBackground />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
