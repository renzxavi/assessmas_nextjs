'use client';

import AuthForm from '@/components/AuthForm'; // Ajusta la ruta si tu componente está en otro lado
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AuthPage() {
  return (
    <div className="min-h-screen flex flex-col bg-orange-50 text-gray-800">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <AuthForm />
      </main>
      <Footer />
    </div>
  );
}
