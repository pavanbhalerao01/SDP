'use client';

import { usePathname } from 'next/navigation';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  if (isAdminPage) {
    return <main className="min-h-screen">{children}</main>;
  }

  return <main className="min-h-screen pt-24">{children}</main>;
}
