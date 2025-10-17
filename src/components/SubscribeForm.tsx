'use client';
import { useState, useEffect } from 'react';

const MESSAGE_DURATION = 3000;

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), MESSAGE_DURATION);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), MESSAGE_DURATION);
      return () => clearTimeout(timer);
    }
  }, [error]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://127.0.0.1:8000/api/subscribe', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMsg = data.detail?.errors?.email?.[0] || data.detail || 'Error subscribing';
        throw new Error(errorMsg);
      }

      setSuccess(data.message);
      setEmail('');
    } catch (err: any) {
      setError(err.message || 'Error connecting to the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-6">
      <div className="w-full max-w-md text-center bg-orange-50 shadow-lg rounded-2xl p-8 sm:p-10">
        <h1 className="text-3xl font-semibold mb-3 text-gray-800">Coming Soon!</h1>
        <p className="text-base text-gray-600 mb-6 leading-relaxed">
          <span className="font-semibold">Our new website is on its way.</span>      
          <br className="hidden sm:block" />
          Get notified when we launch!
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 p-3 border border-orange-400 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-400 w-full"
            required
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-400 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-orange-500 transition-colors w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Subscribe'}
          </button>
        </form>

        {success && (
          <p className="text-green-600 mt-4 text-sm font-medium text-center">
            {success}
          </p>
        )}
        {error && (
          <p className="text-red-500 mt-4 text-sm font-medium text-center">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}