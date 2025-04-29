// app/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../components/ui/Button';
import { Search, ChevronRight, CheckCircle, FileText, Users, Clock } from 'lucide-react';
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
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="bg-white rounded-xl shadow-md overflow-hidden mb-10">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              AI-Powered Loan Risk Assessment
            </h1>
            <p className="text-gray-600 mb-6 text-lg">
              Make smarter lending decisions with our advanced risk analysis platform.
              Get comprehensive insights and predictions for better loan management.
            </p>
            <form onSubmit={handleSearch} className="flex w-full max-w-md mb-6">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={uniqueId}
                  onChange={(e) => setUniqueId(e.target.value)}
                  placeholder="Enter Loan ID or File Number"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <Button 
                type="submit" 
                size="lg" 
                className="rounded-l-none"
              >
                Search
              </Button>
            </form>
          
          </div>
          <div className="hidden md:block bg-blue-600 flex-1 p-8 text-white">
            <div className="h-full flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-6">Key Features</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Advanced risk prediction with 93% accuracy</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Comprehensive loan portfolio analysis</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Real-time credit score integration</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Document verification automation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>



      {/* Features Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Search Loan</h3>
            <p className="text-gray-600">
              Enter the loan ID or file number to access detailed information and risk assessment.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. View Analysis</h3>
            <p className="text-gray-600">
              Get comprehensive risk assessment, payment history, and key financial indicators.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <ChevronRight className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Take Action</h3>
            <p className="text-gray-600">
              Make informed decisions based on AI predictions and recommended actions.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 rounded-xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to transform your loan assessment process?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Join hundreds of financial institutions already using our AI-powered platform for faster, 
          more accurate loan risk assessment.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" className=" text-blue-600 border-white hover:to-blue-700 ">
            Schedule Demo
          </Button>
          <Button variant="outline" className="border-white hover:bg-blue-700">
            Learn More
          </Button>
        </div>
      </section>
    </div>
  );
}