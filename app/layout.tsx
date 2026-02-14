import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollBackgroundManager from '@/components/ScrollBackgroundManager';
import CustomCursor from '@/components/CustomCursor';
import ClientOnly from '@/components/ClientOnly';
import AuthProvider from '@/components/AuthProvider';
import ConditionalLayout from '@/components/ConditionalLayout';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SDP - Student Development Program',
  description: 'Empowering students through technology, innovation, and collaboration',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-950 text-white overflow-x-hidden`} suppressHydrationWarning>
        <AuthProvider>
          <ClientOnly>
            <ScrollBackgroundManager />
            <CustomCursor />
          </ClientOnly>
          <Navbar />
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
