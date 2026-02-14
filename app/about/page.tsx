'use client';

import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { HiAcademicCap, HiLightBulb, HiUserGroup, HiTrendingUp } from 'react-icons/hi';

export default function AboutPage() {
  const values = [
    {
      icon: <HiAcademicCap className="text-5xl" />,
      title: 'Learning First',
      description: 'We prioritize continuous learning and knowledge sharing among our members.',
    },
    {
      icon: <HiLightBulb className="text-5xl" />,
      title: 'Innovation',
      description: 'We encourage creative thinking and innovative solutions to real-world problems.',
    },
    {
      icon: <HiUserGroup className="text-5xl" />,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and community-driven development.',
    },
    {
      icon: <HiTrendingUp className="text-5xl" />,
      title: 'Growth',
      description: 'We support personal and professional growth of every member.',
    },
  ];

  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            About SDP
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Building a community of passionate students dedicated to technology and innovation
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-6 text-cyan-400">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              The Student Development Program (SDP) is dedicated to empowering students through 
              technology education, hands-on projects, and professional development opportunities. 
              We create a collaborative environment where students can learn, grow, and build 
              innovative solutions while connecting with industry professionals and like-minded peers.
            </p>
          </div>
        </motion.section>

        {/* Values Section */}
        <section className="mb-20">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Our Core Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="p-8 bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl hover:border-cyan-500/50 transition-all duration-300 group"
                data-cursor-hover
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-cyan-400 mb-2">500+</div>
              <div className="text-gray-300">Active Members</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-purple-400 mb-2">50+</div>
              <div className="text-gray-300">Events Hosted</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-pink-400 mb-2">100+</div>
              <div className="text-gray-300">Projects Completed</div>
            </div>
          </div>
        </motion.section>
      </div>
    </PageTransition>
  );
}
