import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroBanner from '../components/HeroBanner';
import WhatsAppButton from '../components/WhatsAppButton';

const PublicLayout: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Quietly ping the backend on mount so it wakes up immediately in the background
    const apiUrl = import.meta.env.VITE_API_URL || 'https://cheapbundle.onrender.com/api';
    const baseUrl = apiUrl.endsWith('/api') ? apiUrl.slice(0, -4) : apiUrl;
    fetch(baseUrl).catch(() => {
      // Ignore errors; this is just a warm-up ping
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-textMain font-sans overflow-x-hidden relative pt-[80px]">
      <Navbar />
      {location.pathname === '/' && <HeroBanner />}
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default PublicLayout;
