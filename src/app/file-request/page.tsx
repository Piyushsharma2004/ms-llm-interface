// app/file-request/page.tsx
'use client';
import { useState, useRef } from 'react';
import { loanData } from './data';

export default function LoanUploadPage() {
  const [formData, setFormData] = useState(loanData);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Required fields for JSON validation
  const requiredFields = [
    'file_no', 'state', 'branch', 'centre_name', 'area', 'quarter', 'entity_type',
    'loan_category', 'loan_type', 'product', 'scheme_name', 'gender', 'customer_segment',
    'area_type', 'caste', 'types_of_case', 'loan_segment', 'property_type', 'mortgage_type',
    'source_type', 'loan_amount', 'installments', 'interest', 'disbursement_amount', 'emi',
    'first_due_date', 'total_amt', 'last_due_date', 'installment_due_day', 'repayment_type',
    'disbursement_type', 'disbursement_date', 'disbursement_status', 'processing_fee',
    'service_tax', 'total_processing_fee', 'cersai_fee', 'insurance_type', 'property_insurance',
    'life_insurance', 'total_insurance', 'legal_charges', 'valuation_charges',
    'total_legal_charges', 'deductions', 'advance_emi', 'agreement_date', 'cibil_score',
    'loan_status', 'property_value', 'property_area', 'work_profile_category',
    'work_sub_category', 'work_profile',
  ];

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Convert numeric fields to numbers where necessary
    const numericFields = [
      'loan_amount', 'installments', 'interest', 'disbursement_amount', 'emi',
      'total_amt', 'installment_due_day', 'processing_fee', 'service_tax',
      'total_processing_fee', 'cersai_fee', 'property_insurance', 'life_insurance',
      'total_insurance', 'legal_charges', 'valuation_charges', 'total_legal_charges',
      'deductions', 'advance_emi', 'cibil_score', 'property_value', 'property_area',
    ];
    setFormData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  // Validate JSON against schema
  const validateJson = (data: any): string | null => {
    for (const field of requiredFields) {
      if (!(field in data)) {
        return `Missing required field: ${field}`;
      }
    }
    // Type checks for critical fields
    if (typeof data.loan_amount !== 'number' || data.loan_amount < 0) {
      return 'Loan amount must be a non-negative number';
    }
    if (typeof data.cibil_score !== 'number') {
      return 'CIBIL score must be a number';
    }
    return null;
  };

  // Handle JSON file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage('');
    setIsLoading(true);
    const file = e.target.files?.[0];
    if (!file) {
      setMessage('Error: No file selected.');
      setIsLoading(false);
      return;
    }
    if (!file.name.endsWith('.json')) {
      setMessage('Error: Please upload a valid JSON file.');
      setIsLoading(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target?.result as string);
        const validationError = validateJson(jsonData);
        if (validationError) {
          setMessage(`Error: ${validationError}`);
          setIsLoading(false);
          return;
        }
        setFormData(jsonData);
        setMessage('JSON file loaded successfully.');
      } catch (error) {
        setMessage('Error: Failed to parse JSON file.');
      }
      setIsLoading(false);
    };
    reader.onerror = () => {
      setMessage('Error: Failed to read the file.');
      setIsLoading(false);
    };
    reader.readAsText(file);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/file-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Data uploaded successfully!');
        setFormData(loanData); // Reset to default
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Clear file input
        }
      } else {
        setMessage(`Error: ${result.error || 'Failed to upload data.'}`);
      }
    } catch (error) {
      setMessage('Error: Network or server issue.');
    }
    setIsLoading(false);
  };

  // Reset form to default data
  const handleReset = () => {
    setFormData(loanData);
    setMessage('Form reset to default data.');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold  text-gray-800">Upload Loan Data/Test Data</h1>
      <p className='text-sm mb-6'>The data displayed here is sourced directly from the primary software system and is currently being used for testing and validation purposes </p>

      {/* File Upload Section */}
      <div className="mb-6">
        <label className="font-medium block mb-2 text-gray-700">Upload JSON File</label>
        <input
          type="file"
          accept=".json"
          ref={fileInputRef}
          onChange={handleFileUpload}
          disabled={isLoading}
          className="border p-2 rounded w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
        />
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-700">Edit Loan Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label className="font-medium capitalize text-gray-600">
                {key.replace('_', ' ')}
              </label>
              <input
                type={typeof value === 'number' ? 'number' : 'text'}
                name={key}
                value={value ?? ''} // Use nullish coalescing to handle null/undefined, preserve 0
                onChange={handleChange}
                className="border p-2 rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                required
                disabled={isLoading}
              />
            </div>
          ))}
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`flex items-center px-4 py-2 rounded text-white ${
              isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Uploading...
              </>
            ) : (
              'Upload Data'
            )}
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 disabled:bg-gray-200"
          >
            Reset Form
          </button>
        </div>
      </form>

      {/* Message Display */}
      {message && (
        <p
          className={`mt-4 p-3 rounded ${
            message.includes('Error')
              ? 'bg-red-100 text-red-700'
              : 'bg-green-100 text-green-700'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}