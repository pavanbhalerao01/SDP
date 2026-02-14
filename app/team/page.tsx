'use client';

import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { HiMail } from 'react-icons/hi';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { useEffect, useState } from 'react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    email?: string;
  };
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch team members from API
    fetch('/api/team')
      .then(res => res.json())
      .then(data => {
        setTeamMembers(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to demo data
        setTeamMembers([
          {
            id: 1,
            name: 'Alex Johnson',
            role: 'President',
            bio: 'Full-stack developer passionate about building scalable applications',
            image: '/team/placeholder.jpg',
            social: {
              linkedin: 'https://linkedin.com',
              github: 'https://github.com',
              email: 'alex@sdp.com',
            },
          },
          {
            id: 2,
            name: 'Sarah Chen',
            role: 'Vice President',
            bio: 'UI/UX designer focused on creating beautiful user experiences',
            image: '/team/placeholder.jpg',
            social: {
              linkedin: 'https://linkedin.com',
              twitter: 'https://twitter.com',
              email: 'sarah@sdp.com',
            },
          },
          {
            id: 3,
            name: 'Michael Brown',
            role: 'Technical Lead',
            bio: 'AI/ML enthusiast working on cutting-edge projects',
            image: '/team/placeholder.jpg',
            social: {
              github: 'https://github.com',
              linkedin: 'https://linkedin.com',
              email: 'michael@sdp.com',
            },
          },
          {
            id: 4,
            name: 'Emily Davis',
            role: 'Events Coordinator',
            bio: 'Organizing amazing events and building community connections',
            image: '/team/placeholder.jpg',
            social: {
              linkedin: 'https://linkedin.com',
              twitter: 'https://twitter.com',
              email: 'emily@sdp.com',
            },
          },
        ]);
        setLoading(false);
      });
  }, []);

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
            Our Team
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the dedicated individuals driving innovation and building our community
          </p>
        </motion.div>

        {/* Team Grid */}
        {loading ? (
          <div className="text-center text-gray-400">Loading team...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 group"
                data-cursor-hover
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                {/* Avatar Placeholder */}
                <div className="w-full h-64 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-4xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-purple-400 mb-3 font-semibold">{member.role}</p>
                  <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
                  
                  {/* Social Links */}
                  <div className="flex gap-3">
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                        <FaLinkedin size={20} />
                      </a>
                    )}
                    {member.social.github && (
                      <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                        <FaGithub size={20} />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-400 transition-colors">
                        <FaTwitter size={20} />
                      </a>
                    )}
                    {member.social.email && (
                      <a href={`mailto:${member.social.email}`} className="text-gray-400 hover:text-cyan-400 transition-colors">
                        <HiMail size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Join Team CTA */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-12 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4 text-white">
            Want to Join Our Team?
          </h2>
          <p className="text-gray-300 mb-6">
            We're always looking for passionate individuals to help lead our community
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
            Apply Now
          </button>
        </motion.div>
      </div>
    </PageTransition>
  );
}
