'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiCalendar, HiUsers, HiMail, HiQuestionMarkCircle } from 'react-icons/hi';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    events: 0,
    team: 0,
    messages: 0,
    faqs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [eventsRes, teamRes, messagesRes, faqsRes] = await Promise.all([
          fetch('/api/events'),
          fetch('/api/team'),
          fetch('/api/contact'),
          fetch('/api/faqs'),
        ]);

        const [events, team, messages, faqs] = await Promise.all([
          eventsRes.json(),
          teamRes.json(),
          messagesRes.json(),
          faqsRes.json(),
        ]);

        setStats({
          events: Array.isArray(events) ? events.length : 0,
          team: Array.isArray(team) ? team.length : 0,
          messages: Array.isArray(messages) ? messages.length : 0,
          faqs: Array.isArray(faqs) ? faqs.length : 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      name: 'Total Events',
      value: stats.events,
      icon: HiCalendar,
      color: 'from-cyan-500 to-blue-500',
      href: '/admin/events',
    },
    {
      name: 'Team Members',
      value: stats.team,
      icon: HiUsers,
      color: 'from-purple-500 to-pink-500',
      href: '/admin/team',
    },
    {
      name: 'Messages',
      value: stats.messages,
      icon: HiMail,
      color: 'from-pink-500 to-red-500',
      href: '/admin/messages',
    },
    {
      name: 'FAQs',
      value: stats.faqs,
      icon: HiQuestionMarkCircle,
      color: 'from-green-500 to-teal-500',
      href: '/admin/faqs',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-gray-400 mt-2">
          Welcome to the SDP Admin Dashboard
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-slate-900 border border-slate-800 rounded-lg p-6 animate-pulse"
            >
              <div className="h-8 bg-slate-800 rounded mb-4"></div>
              <div className="h-12 bg-slate-800 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={stat.href}>
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-all cursor-pointer group">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">{stat.name}</p>
                      <p className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/events">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 transition-all"
            >
              Add New Event
            </motion.button>
          </Link>
          <Link href="/admin/team">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              Add Team Member
            </motion.button>
          </Link>
          <Link href="/admin/messages">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg font-medium hover:from-pink-600 hover:to-red-600 transition-all"
            >
              View Messages
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}
