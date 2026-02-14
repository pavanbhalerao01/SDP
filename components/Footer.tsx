'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  // Don't show footer on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="relative bg-slate-950/50 border-t border-purple-500/20 py-12 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-cyan-400 mb-4">SDP</h3>
            <p className="text-gray-400 text-sm">
              Student Development Program - Empowering students through technology, innovation, and collaboration.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-cyan-400 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/" className="hover:text-cyan-400 transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-cyan-400 transition-colors">About</a></li>
              <li><a href="/events" className="hover:text-cyan-400 transition-colors">Events</a></li>
              <li><a href="/team" className="hover:text-cyan-400 transition-colors">Team</a></li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-cyan-400 mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Email: contact@sdp.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Location: Your University Campus</li>
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-purple-500/20 pt-6 text-center text-gray-400 text-sm">
          <p>© {currentYear} Student Development Program. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
