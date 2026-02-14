'use client';

import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { HiCalendar, HiLocationMarker, HiClock } from 'react-icons/hi';
import { useEffect, useState } from 'react';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch events from API
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to demo data
        setEvents([
          {
            id: 1,
            title: 'Web Development Workshop',
            description: 'Learn the fundamentals of modern web development with React and Next.js',
            date: '2026-03-15',
            time: '14:00',
            location: 'Room 301, Tech Building',
            category: 'Workshop',
          },
          {
            id: 2,
            title: 'AI & Machine Learning Seminar',
            description: 'Explore the latest trends in AI and machine learning with industry experts',
            date: '2026-03-22',
            time: '16:00',
            location: 'Auditorium Hall',
            category: 'Seminar',
          },
          {
            id: 3,
            title: 'Hackathon 2026',
            description: '48-hour coding marathon to build innovative solutions',
            date: '2026-04-05',
            time: '09:00',
            location: 'Innovation Lab',
            category: 'Hackathon',
          },
        ]);
        setLoading(false);
      });
  }, []);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Workshop: 'from-cyan-500 to-blue-500',
      Seminar: 'from-purple-500 to-pink-500',
      Hackathon: 'from-pink-500 to-rose-500',
      Meetup: 'from-green-500 to-emerald-500',
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

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
            Upcoming Events
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join us for workshops, seminars, hackathons, and networking events
          </p>
        </motion.div>

        {/* Events List */}
        {loading ? (
          <div className="text-center text-gray-400">Loading events...</div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-300 group"
                data-cursor-hover
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(event.category)} rounded-full text-sm font-semibold`}>
                        {event.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{event.description}</p>
                    <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <HiCalendar className="text-cyan-400" />
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <HiClock className="text-purple-400" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <HiLocationMarker className="text-pink-400" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 whitespace-nowrap">
                    Register Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-12 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4 text-white">
            Want to Host an Event?
          </h2>
          <p className="text-gray-300 mb-6">
            We're always looking for members to share their knowledge and organize events
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
            Propose an Event
          </button>
        </motion.div>
      </div>
    </PageTransition>
  );
}
