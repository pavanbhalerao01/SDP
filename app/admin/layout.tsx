'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HiHome,
  HiCalendar,
  HiUsers,
  HiQuestionMarkCircle,
  HiMail,
  HiLogout,
  HiMenu,
  HiX,
} from 'react-icons/hi';

const menuItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HiHome },
  { name: 'Events', href: '/admin/events', icon: HiCalendar },
  { name: 'Team', href: '/admin/team', icon: HiUsers },
  { name: 'FAQs', href: '/admin/faqs', icon: HiQuestionMarkCircle },
  { name: 'Messages', href: '/admin/messages', icon: HiMail },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (status === 'unauthenticated' && !isLoginPage) {
      router.push('/admin/login');
    } else if (status === 'authenticated' && (session?.user as any)?.role !== 'admin') {
      router.push('/');
    }
  }, [status, session, router, pathname, isLoginPage]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  // If on login page, render without admin layout
  if (isLoginPage) {
    return <div className="min-h-screen bg-slate-950">{children}</div>;
  }

  // If not authenticated or not admin, don't render protected content
  if (status === 'unauthenticated' || (session?.user as any)?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 lg:flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 lg:translate-x-0 lg:static lg:z-0 flex-shrink-0"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-slate-800">
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              SDP Admin
            </h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <HiX className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User info & logout */}
          <div className="p-4 border-t border-slate-800">
            <div className="mb-3 px-4 py-2 bg-slate-800 rounded-lg">
              <p className="text-sm text-gray-400">Logged in as</p>
              <p className="text-sm font-medium text-white truncate">
                {session?.user?.email}
              </p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
            >
              <HiLogout className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 lg:flex-initial lg:w-full">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-30 bg-slate-900 border-b border-slate-800 px-4 py-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-400 hover:text-white"
          >
            <HiMenu className="h-6 w-6" />
          </button>
        </header>

        {/* Page content */}
        <main className="px-4 py-3 lg:px-6 lg:py-4">{children}</main>
      </div>
    </div>
  );
}
