'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Toolbar from '@/components/Toolbar';
import Footer from '@/components/Footer';

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header fijo */}
      <Toolbar />

      <div className="flex flex-1 bg-orange-50 text-gray-800 pt-[60px]">


        {/* Contenido principal */}
        <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-10">
          
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
