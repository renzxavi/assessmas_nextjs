'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // Función de logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/auth');
  };

  return (
    <header className="w-full bg-gradient-to-r from-orange-400 to-orange-300 text-white py-3 shadow-md fixed top-0 z-50">
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

          {/* Botón logout solo icono */}
          <button
            onClick={handleLogout}
            title="log out"
            className="bg-white/90 text-orange-500 p-2 rounded-full hover:bg-white transition-all shadow-sm hover:shadow-md"
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
          </button>
        </nav>
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div className="md:hidden bg-orange-100 text-gray-800 flex flex-col items-start px-6 py-3 shadow-md">
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

          {/* Logout solo icono en móvil */}
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            title="log out"
            className="mt-2 bg-white/90 items-center text-orange-500 p-2 rounded-full hover:bg-white transition-all shadow-sm hover:shadow-md">
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
          </button>
        </div>
      )}
    </header>
  );
}