// app/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../components/ui/Button';
import { Search, ChevronRight, CheckCircle, FileText, Users, Clock, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [uniqueId, setUniqueId] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (uniqueId) {
      router.push(`/report/${uniqueId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                AI-Powered Loan Risk Assessment
              </h1>
              <p className="text-gray-600 mb-8 text-lg max-w-xl">
                Make smarter lending decisions with our advanced risk analysis platform.
                Get comprehensive insights and predictions for better loan management.
              </p>
              <form onSubmit={handleSearch} className="flex w-full max-w-md mb-8">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={uniqueId}
                    onChange={(e) => setUniqueId(e.target.value)}
                    placeholder="Enter Loan ID or File Number"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="rounded-l-none shadow-sm"
                >
                  Search
                </Button>
              </form>
              
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                <span>Get results in seconds, not days.</span>
              </div>
            </div>
            <div className="hidden md:block bg-gradient-to-br from-blue-600 to-blue-800 flex-1 p-12 text-white">
              <div className="h-full flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-8">Key Features</h2>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 mr-3 mt-0.5 flex-shrink-0 text-blue-200" />
                    <span className="text-lg">Advanced risk prediction with 93% accuracy</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 mr-3 mt-0.5 flex-shrink-0 text-blue-200" />
                    <span className="text-lg">Comprehensive loan portfolio analysis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 mr-3 mt-0.5 flex-shrink-0 text-blue-200" />
                    <span className="text-lg">Real-time credit score integration</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 mr-3 mt-0.5 flex-shrink-0 text-blue-200" />
                    <span className="text-lg">Document verification automation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        

        {/* Features Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Search className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">1. Search Loan</h3>
              <p className="text-gray-600 text-center">
                Enter the loan ID or file number to access detailed information and risk assessment.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FileText className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">2. View Analysis</h3>
              <p className="text-gray-600 text-center">
                Get comprehensive risk assessment, payment history, and key financial indicators.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <ChevronRight className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">3. Take Action</h3>
              <p className="text-gray-600 text-center">
                Make informed decisions based on AI predictions and recommended actions.
              </p>
            </div>
          </div>
        </section>

       
      </div>
      

    </div>
  );
}