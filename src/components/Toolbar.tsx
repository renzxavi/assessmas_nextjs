'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // Función de logout - Protegida contra errores de hidratación
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
    router.push('/auth');
  };

  return (
    <header className="w-full bg-gradient-to-r from-orange-400 to-orange-300 text-white py-2 shadow-md fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <h1 className="text-lg md:text-2xl font-semibold tracking-tight">
          Assessmas
        </h1>

        {/* Botón menú móvil */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>

        {/* Menú desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="/home" className="hover:text-orange-100 transition-colors">
            Home
          </a>
          <a href="/projects" className="hover:text-orange-100 transition-colors">
            Projects
          </a>
          <a href="/dashboard" className="hover:text-orange-100 transition-colors">
            Reports
          </a>

          {/* NUEVO DISEÑO: Botón logout solo icono (Desktop) */}
          <button
            onClick={handleLogout}
            title="Log In"
            className="text-white hover:text-orange-100 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-8V7"
              />
            </svg>
          </button>
        </nav>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE CON ANIMACIÓN */}
      {menuOpen && (
        <div 
          className="md:hidden bg-orange-100 text-gray-800 flex flex-col items-start px-6 py-3 shadow-lg 
                     animate-slide-down" 
        >
          <a
            href="/home"
            onClick={() => setMenuOpen(false)}
            className="w-full py-2 border-b border-orange-200 hover:bg-orange-50 transition"
          >
            Home
          </a>
          <a
            href="/projects"
            onClick={() => setMenuOpen(false)}
            className="w-full py-2 border-b border-orange-200 hover:bg-orange-50 transition"
          >
            Projects
          </a>
          <a
            href="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="w-full py-2 border-b border-orange-200 hover:bg-orange-50 transition"
          >
            Reports
          </a>

          {/* NUEVO DISEÑO: Botón de Logout con texto y color de acento (Móvil) */}
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            title="Log In"
            className="mt-3 w-full flex items-center justify-center gap-2 py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors focus:outline-none focus:ring-4 focus:ring-orange-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-8V7"
              />
            </svg>
            Log In
          </button>
        </div>
      )}
    </header>
  );
}