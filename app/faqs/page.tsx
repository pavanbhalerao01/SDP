'use client';

import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';

interface FAQ {
  question: string;
  answer: string;
}

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: 'What is the Student Development Program (SDP)?',
      answer: 'SDP is a student-led organization focused on empowering students through technology education, hands-on projects, and professional development opportunities. We organize workshops, hackathons, seminars, and networking events.',
    },
    {
      question: 'How can I join SDP?',
      answer: 'Joining SDP is easy! Simply fill out the registration form on our Contact page or attend one of our events. All students interested in technology and innovation are welcome to join.',
    },
    {
      question: 'Do I need programming experience to join?',
      answer: 'No prior programming experience is required! We welcome students of all skill levels, from complete beginners to advanced developers. Our workshops and events cater to various experience levels.',
    },
    {
      question: 'Are there any membership fees?',
      answer: 'SDP membership is completely free! We believe in making technology education accessible to all students. Some special events or workshops may have optional fees for materials or certifications.',
    },
    {
      question: 'What types of events do you organize?',
      answer: 'We organize a variety of events including technical workshops, hackathons, guest speaker seminars, networking sessions, coding competitions, and social meetups. Check our Events page for upcoming activities.',
    },
    {
      question: 'Can I propose an event or workshop?',
      answer: 'Absolutely! We encourage members to share their knowledge and lead workshops. If you have an idea for an event or workshop, reach out to us through the Contact page or speak with any team member.',
    },
    {
      question: 'How often do you meet?',
      answer: 'We organize events throughout the academic year, typically 2-3 events per month. Follow our social media or subscribe to our newsletter to stay updated on upcoming events.',
    },
    {
      question: 'Do you offer mentorship programs?',
      answer: 'Yes! We connect experienced members and industry professionals with students looking for guidance in their technical journey. Sign up through our Contact page to be matched with a mentor.',
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
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about SDP
          </p>
        </motion.div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl hover:border-cyan-500/50 transition-all duration-300"
                data-cursor-hover
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white pr-8">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <HiChevronDown className="text-cyan-400 text-2xl flex-shrink-0" />
                  </motion.div>
                </div>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-400 mt-4 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-12 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4 text-white">
            Still Have Questions?
          </h2>
          <p className="text-gray-300 mb-6">
            We're here to help! Reach out to us and we'll get back to you as soon as possible.
          </p>
          <a href="/contact">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
              Contact Us
            </button>
          </a>
        </motion.div>
      </div>
    </PageTransition>
  );
}
