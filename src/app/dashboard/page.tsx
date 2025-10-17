'use client';
import Toolbar from '../../components/Toolbar';
import Footer from '../../components/Footer';


export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <Toolbar />
      <main className="flex flex-col md:flex-row flex-1 pt-16 gap-6 px-4 md:px-12 items-stretch justify-center w-full max-w-7xl mx-auto">
      </main>
      <Footer />
    </div>
  );
}