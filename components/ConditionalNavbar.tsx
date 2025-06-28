'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/NavBar';

export function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Hide navbar when in /app routes
  if (pathname?.startsWith('/app')) {
    return null;
  }
  
  return <Navbar />;
} 