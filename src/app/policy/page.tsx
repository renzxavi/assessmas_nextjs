'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 bg-orange-50 text-gray-800 pt-[60px]">
        <main className="flex-1 flex flex-col items-center **justify-start** p-6 md:p-10">
          <h2 className="text-4xl font-bold">Privacy Policy</h2>
        </main>
      </div>
      <Footer />
    </div>
  );
}