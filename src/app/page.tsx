'use client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthForm from '../components/AuthForm';
import SubscribeForm from '../components/SubscribeForm';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex flex-col md:flex-row flex-1 pt-16 gap-6 px-4 md:px-12 items-stretch justify-center w-full max-w-7xl mx-auto">
        <div className="flex-1 flex items-center justify-center order-2 md:order-1">
          <SubscribeForm />
        </div>
        <div className="flex-1 flex items-center justify-center order-1 md:order-2">
          <AuthForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}