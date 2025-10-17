'use client';
import { useState, useEffect } from 'react';
import Toolbar from '../../components/Toolbar';
import Footer from '../../components/Footer';

export default function HomePage() {
  const [companyName, setCompanyName] = useState('Google');
  const [chartUrl, setChartUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ c_suite: 0, directors: 0, total_hc: 0 });

  const loadChart = async (company: string) => {
    if (!company.trim()) return;
    
    setLoading(true);
    setError('');
    setStats({ c_suite: 0, directors: 0, total_hc: 0 });
    
    try {
      console.log('Cargando gráfico para:', company);
      const url = `http://localhost:8000/api/company-funnel?company_name=${encodeURIComponent(company)}`;
      console.log('URL:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      setChartUrl(url);
      
    } catch (err: any) {
      console.error('Error completo:', err);
      setError(err.message || 'Failed to load chart');
      setChartUrl('');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChart(companyName);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadChart(companyName);
  };

  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <Toolbar />
      
      <main className="flex flex-col flex-1 pt-20 pb-8 gap-6 px-4 md:px-12 w-full max-w-7xl mx-auto">
        
        {/* Selector de compañía */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Company Organizational Chart
          </h2>
          
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
              className="flex-1 p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-400 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-orange-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'Load Chart'}
            </button>
          </form>
        </div>

        {/* Gráfico */}
        <div className="bg-white rounded-lg shadow-md p-6 min-h-[500px] flex items-center justify-center">
          {loading && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400"></div>
              <p className="mt-4 text-gray-600">Loading chart...</p>
            </div>
          )}
          
          {error && !loading && (
            <div className="text-center text-red-500">
              <p className="text-lg font-medium">⚠️ {error}</p>
            </div>
          )}
          
          {chartUrl && !loading && !error && (
            <iframe
              src={chartUrl}
              className="w-full h-[500px] border-0"
              title="Company Funnel Chart"
            />
          )}
          
          {!loading && !error && !chartUrl && (
            <div className="text-center text-gray-400">
              <p>No chart loaded</p>
            </div>
          )}
        </div>

        {/* Información adicional */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">C-Suite</h3>
            <p className="text-3xl font-bold text-green-500">{stats.c_suite || '--'}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Directors</h3>
            <p className="text-3xl font-bold text-gray-600">{stats.directors || '--'}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total HC</h3>
            <p className="text-3xl font-bold text-gray-600">{stats.total_hc || '--'}</p>
          </div>
        </div>

      </main>
      
      <Footer />
    </div>
  );
}