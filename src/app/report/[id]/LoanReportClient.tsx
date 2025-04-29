'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CircularProgressbar,
  buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, ScatterChart, Scatter, ZAxis,
  CartesianGrid, LineChart, Line
} from 'recharts';
import {
  AlertTriangle,
  CheckCircle,
  FileText,
  Home,
  AlertCircle,
  Download,
  ExternalLink,
  BarChart2,
  PieChart as PieChartIcon,
  TrendingUp,
  Shield
} from 'lucide-react';

interface LoanData {
  id: string;
  file_no?: string;
  state?: string;
  branch?: string;
  centre_name?: string;
  area?: string;
  loan_category?: string;
  loan_type?: string;
  product?: string;
  scheme_name?: string;
  gender?: string;
  customer_segment?: string;
  area_type?: string;
  caste?: string;
  loan_amount?: number;
  installments?: number;
  interest?: number;
  disbursement_amount?: number;
  emi?: number;
  first_due_date?: string;
  total_amt?: number;
  last_due_date?: string;
  installment_due_day?: number;
  repayment_type?: string;
  disbursement_type?: string;
  disbursement_date?: string;
  disbursement_status?: string;
  processing_fee?: number;
  service_tax?: number;
  cersai_fee?: number;
  insurance_type?: string;
  property_insurance?: number;
  life_insurance?: number;
  total_insurance?: number;
  agreement_date?: string;
  loan_status?: string;
  property_value?: number;
  property_area?: number;
  work_profile_category?: string;
  work_sub_category?: string;
  work_profile?: string;
  loan_predicted?: string;
  cibil_score?: number;
  short_risk_summary?: string;
  full_summary_url?: string;
  total_processing_fee?: number;
  legal_charges?: number;
  valuation_charges?: number;
  total_legal_charges?: number;
  deductions?: number;
  advance_emi?: number;
  monthly_income?: number;
  annual_income?: number;
  debt_to_income_ratio?: number;
  repayment_capacity?: number;
  risk_score?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
        <p className="font-semibold">{label}</p>
        <p className="text-blue-500">{`${payload[0].name}: ${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

const ScatterTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
        <p className="font-semibold">{`${payload[0].name}: ${payload[0].value}`}</p>
        <p className="text-blue-500">{`${payload[1].name}: ₹${payload[1].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

export default function LoanReportClient({
  loanData,
  riskDistribution,
  loanByState,
  cibilVsLoanData,
  repaymentVsLoanData,
  loanToIncomeVsCibil,
  riskScoreDistribution
}: {
  loanData: LoanData;
  riskDistribution: any[];
  loanByState: any[];
  cibilVsLoanData: any[];
  repaymentVsLoanData: any[];
  loanToIncomeVsCibil: any[];
  riskScoreDistribution: any[];
}) {
  const [showFullSummary, setShowFullSummary] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');

  if (!loanData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-gray-800">Loan Data Not Found</h2>
          <p className="text-gray-600 mt-2">The requested loan information could not be retrieved.</p>
          <Link href="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Return to Search
          </Link>
        </div>
      </div>
    );
  }

  // Calculate insights
  const loanToValue = loanData.loan_amount && loanData.property_value
    ? (loanData.loan_amount / loanData.property_value) * 100
    : null;

  const getLoanToValueCategory = () => {
    if (!loanToValue) return 'N/A';
    if (loanToValue < 50) return 'Low (Good)';
    if (loanToValue < 80) return 'Medium';
    return 'High (Risky)';
  };

  const getRiskColor = () => {
    if (loanData.loan_predicted === 'Low Risk') return 'text-green-500';
    if (loanData.loan_predicted === 'Medium Risk') return 'text-yellow-500';
    return 'text-red-500';
  };

  const getRiskBackgroundColor = () => {
    if (loanData.loan_predicted === 'Low Risk') return 'bg-green-50 border-green-200';
    if (loanData.loan_predicted === 'Medium Risk') return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getRiskIcon = () => {
    if (loanData.loan_predicted === 'Low Risk') return <CheckCircle className="h-6 w-6 text-green-500 mr-3" />;
    if (loanData.loan_predicted === 'Medium Risk') return <AlertTriangle className="h-6 w-6 text-yellow-500 mr-3" />;
    return <AlertCircle className="h-6 w-6 text-red-500 mr-3" />;
  };

  const getCibilScoreCategory = () => {
    const score = loanData.cibil_score;
    if (!score) return 'N/A';
    if (score >= 750) return 'Excellent';
    if (score >= 700) return 'Good';
    if (score >= 650) return 'Fair';
    if (score >= 600) return 'Poor';
    return 'Very Poor';
  };

  const getCibilScoreColor = () => {
    const score = loanData.cibil_score;
    if (!score) return 'text-gray-500';
    if (score >= 750) return 'text-green-500';
    if (score >= 700) return 'text-blue-500';
    if (score >= 650) return 'text-yellow-500';
    if (score >= 600) return 'text-orange-500';
    return 'text-red-500';
  };

  const pieColors = ['#22c55e', '#f59e0b', '#ef4444'];
  const formattedRiskDistribution = riskDistribution.map((item, index) => ({
    name: item.loan_predicted || 'Unknown',
    value: item.count,
    color: pieColors[index % pieColors.length]
  }));

  // Handle the PDF view and download
  const handleViewPDF = () => {
    if (loanData.full_summary_url) {
      window.open(loanData.full_summary_url, '_blank');
    }
  };

  const handleDownloadPDF = () => {
    if (loanData.full_summary_url) {
      const link = document.createElement('a');
      link.href = loanData.full_summary_url;
      link.download = `Loan_Risk_Analysis_${loanData.file_no}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 ">
        <header>
            <div className='flex justify-between'>
            <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Loan Risk Assessment Report</h1>
            </div>
            <div className="flex items-center gap-4">
                <Link href="/" className="text-blue-500 hover:underline">
                Back to Search
                </Link>
              
            </div>
            </div>
        </header>
    

        {/* Status Banner */}
        <div className={`mb-8 p-6 rounded-xl border shadow-sm flex items-center ${getRiskBackgroundColor()}`}>
          {getRiskIcon()}
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h2 className={`text-xl font-semibold ${getRiskColor()}`}>
                {loanData.loan_predicted || 'Risk Assessment Not Available'}
              </h2>
              <div className="text-right">
                <p className="text-sm text-gray-500">File No: {loanData.file_no || 'N/A'}</p>
                <p className="text-sm text-gray-500">Loan Amount: ₹{loanData.loan_amount?.toLocaleString() || 'N/A'}</p>
              </div>
            </div>
            <p className="text-gray-700 mt-1">
              {loanData.short_risk_summary?.substring(0, 100)}...
            </p>
          </div>
        </div>


        {/* Content Area */}
        <div className="grid grid-cols-1 gap-8">
          {/* AI Summary Tab */}
         
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">AI Generated Risk Analysis</h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleViewPDF}
                      className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View PDF
                    </button>
                    <button
                      onClick={handleDownloadPDF}
                      className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200 text-sm"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                  </div>
                </div>
                
                <div className="mb-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Executive Summary</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {loanData.short_risk_summary || "The AI risk assessment system has analyzed this loan application and determined it to be of moderate risk. The applicant's financial profile, credit history, and loan parameters have been evaluated against our comprehensive risk model. Further details are available in the full report."}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Key Risk Factors</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500 mr-2 mt-0.5">1</div>
                        <span className="text-gray-700">Loan-to-Value Ratio: {loanToValue ? `${loanToValue.toFixed(1)}%` : 'N/A'} ({getLoanToValueCategory()})</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500 mr-2 mt-0.5">2</div>
                        <span className="text-gray-700">CIBIL Score: {loanData.cibil_score || 'N/A'} ({getCibilScoreCategory()})</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500 mr-2 mt-0.5">3</div>
                        <span className="text-gray-700">Debt-to-Income Ratio: {loanData.debt_to_income_ratio ? `${loanData.debt_to_income_ratio.toFixed(1)}%` : 'N/A'}</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500 mr-2 mt-0.5">4</div>
                        <span className="text-gray-700">Repayment Capacity: {loanData.repayment_capacity ? `${loanData.repayment_capacity.toFixed(1)}%` : 'N/A'}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Recommendation</h3>
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 mr-4">
                        <CircularProgressbar
                          value={loanData.risk_score || 65}
                          text={`${loanData.risk_score || 65}`}
                          strokeWidth={10}
                          styles={buildStyles({
                            textSize: '2rem',
                            pathColor: loanData.risk_score && loanData.risk_score > 70 ? '#22c55e' : loanData.risk_score && loanData.risk_score > 40 ? '#f59e0b' : '#ef4444',
                            textColor: '#1f2937',
                            trailColor: '#e5e7eb'
                          })}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Risk Score</p>
                        <p className="text-sm text-gray-500">Scale: 0-100 (Higher is better)</p>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      Based on our analysis, this loan is classified as <span className={getRiskColor()}>{loanData.loan_predicted || 'Medium Risk'}</span>. 
                      {loanData.loan_predicted === 'Low Risk' && ' Recommended for approval with standard terms.'}
                      {loanData.loan_predicted === 'Medium Risk' && ' Consider approval with modified terms or additional collateral.'}
                      {loanData.loan_predicted === 'High Risk' && ' Not recommended for approval under current terms.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
        
          
        
          
          {/* Loan Details Tab */}
     
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Applicant Details</h3>
                  <FileText className="h-5 w-5 text-blue-500" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">File No</span>
                    <span className="font-medium">{loanData.file_no || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">State</span>
                    <span className="font-medium">{loanData.state || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Branch</span>
                    <span className="font-medium">{loanData.branch || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Centre Name</span>
                    <span className="font-medium">{loanData.centre_name || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Area</span>
                    <span className="font-medium">{loanData.area || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Gender</span>
                    <span className="font-medium">{loanData.gender || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Customer Segment</span>
                    <span className="font-medium">{loanData.customer_segment || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-gray-600">Area Type</span>
                    <span className="font-medium">{loanData.area_type || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Loan Specifications</h3>
                  <Home className="h-5 w-5 text-blue-500" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Loan Category</span>
                    <span className="font-medium">{loanData.loan_category || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Loan Type</span>
                    <span className="font-medium">{loanData.loan_type || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Product</span>
                    <span className="font-medium">{loanData.product || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Scheme Name</span>
                    <span className="font-medium">{loanData.scheme_name || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Amount</span>
                    <span className="font-medium">₹{loanData.loan_amount?.toLocaleString() || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Installments</span>
                    <span className="font-medium">{loanData.installments || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Interest Rate</span>
                    <span className="font-medium">{loanData.interest ? `${loanData.interest}%` : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">EMI</span>
                    <span className="font-medium">₹{loanData.emi?.toLocaleString() || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-gray-600">Status</span>
                    <span className={`font-medium ${
                      loanData.loan_status === 'Approved' ? 'text-green-500' :
                      loanData.loan_status === 'Pending' ? 'text-yellow-500' :
                      loanData.loan_status === 'Rejected' ? 'text-red-500' : ''
                    }`}>
                      {loanData.loan_status || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Disbursement Details</h3>
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Disbursement Amount</span>
                    <span className="font-medium">₹{loanData.disbursement_amount?.toLocaleString() || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Disbursement Type</span>
                    <span className="font-medium">{loanData.disbursement_type || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Disbursement Date</span>
                    <span className="font-medium">{loanData.disbursement_date || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Disbursement Status</span>
                    <span className="font-medium">{loanData.disbursement_status || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">First Due Date</span>
                    <span className="font-medium">{loanData.first_due_date || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Last Due Date</span>
                    <span className="font-medium">{loanData.last_due_date || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-gray-600">Installment Due Day</span>
                    <span className="font-medium">{loanData.installment_due_day || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Fees & Charges</h3>
                  <PieChartIcon className="h-5 w-5 text-blue-500" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Processing Fee</span>
                    <span className="font-medium">₹{loanData.processing_fee?.toLocaleString() || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Service Tax</span>
                    <span className="font-medium">₹{loanData.service_tax?.toLocaleString() || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">CERSAI Fee</span>
                    <span className="font-medium">₹{loanData.cersai_fee?.toLocaleString() || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Legal Charges</span>
                    <span className="font-medium">₹{loanData.legal_charges?.toLocaleString() || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Valuation Charges</span>
                    <span className="font-medium">₹{loanData.valuation_charges?.toLocaleString() || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Insurance Type</span>
                    <span className="font-medium">{loanData.insurance_type || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Life Insurance</span>
                    <span className="font-medium">₹{loanData.life_insurance?.toLocaleString() || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-gray-600">Total Deductions</span>
                    <span className="font-medium">₹{loanData.deductions?.toLocaleString() || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
       
        </div>
      </div>
    
    </div>
  );
}