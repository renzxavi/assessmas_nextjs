'use client';
import { useState } from 'react';

type Mode = 'login' | 'register';

export default function AuthForm() {
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 🔒 Validación básica de email
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    // 🔒 Validación de contraseñas en registro
    if (mode === 'register') {
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        setLoading(false);
        return;
      }

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!passwordRegex.test(password)) {
        setError('Password must be at least 8 characters long and include both uppercase and lowercase letters.');
        setLoading(false);
        return;
      }
    }

    const endpoint =
      mode === 'login'
        ? 'http://127.0.0.1:8000/api/login'
        : 'http://127.0.0.1:8000/api/register';

    try {
      const body =
        mode === 'login'
          ? { email, password }
          : {
              name,
              surname,
              email,
              password,
              password_confirmation: confirmPassword, // Laravel espera este campo
            };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      // ✅ Manejo de errores con tipado seguro
      if (!res.ok) {
        let firstError = 'Server error.';
        if (data.errors && typeof data.errors === 'object') {
          const firstKey = Object.keys(data.errors)[0];
          if (firstKey && Array.isArray(data.errors[firstKey])) {
            firstError = data.errors[firstKey][0];
          }
        } else if (data.message) {
          firstError = data.message;
        }
        throw new Error(firstError);
      }

      // ✅ Guardar token y redirigir
      localStorage.setItem('token', data.access_token || 'fake_token');
      window.location.href = '/home';
    } catch (err: any) {
      setError(err.message || 'Error de conexión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-6 px-6">
      <div className="w-full max-w-sm text-center bg-orange-50 shadow-lg rounded-2xl p-8 sm:p-10">
        <h1 className="text-3xl font-semibold mb-3 text-gray-800">
          {mode === 'login' ? 'Sign In' : 'Create Your Account'}
        </h1>
        <p className="text-base text-gray-600 mb-6 leading-relaxed">
          {mode === 'login' ? 'We\'re glad you\'re here!' : 'Join us today!'}
        </p>


        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {mode === 'register' && (
            <>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-orange-400 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-400 disabled:bg-gray-100"
                required
                disabled={loading}
              />
              <input
                type="text"
                placeholder="Enter your surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="w-full p-3 border border-orange-400 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-400 disabled:bg-gray-100"
                required
                disabled={loading}
              />
            </>
          )}

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-orange-400 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-400 disabled:bg-gray-100"
            required
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-orange-400 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-400 disabled:bg-gray-100"
            required
            disabled={loading}
          />

          {mode === 'register' && (
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-orange-400 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-400 disabled:bg-gray-100"
              required
              disabled={loading}
            />
          )}
          
          {error && (
            <p className="text-red-500 text-center text-sm font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-orange-400 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-orange-500 transition-colors w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading
              ? 'Processing...'
              : mode === 'login'
              ? 'Log In'
              : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {mode === 'login' ? (
            <>
              Don’t have an account?{' '}
              <span
                className="text-orange-500 cursor-pointer font-semibold hover:underline transition-colors"
                onClick={() => {
                  setMode('register');
                  setError('');
                }}
              >
                Create your account
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span
                className="text-orange-500 cursor-pointer font-semibold hover:underline transition-colors"
                onClick={() => {
                  setMode('login');
                  setError('');
                }}
              >
                Sign In
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}