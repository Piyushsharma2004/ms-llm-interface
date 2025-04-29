import LoanReportClient from './LoanReportClient';
import { getLoanData, getRiskDistribution, getLoanByState } from '../../../../lib/db';

export default async function LoanReport({ params }: { params: { id: string } }) {
  // Fetch loan data and exclude sensitive fields
  const loanData = await getLoanData(params.id);
  const riskDistribution = await getRiskDistribution();
  const loanByState = await getLoanByState();

  // Filter out sensitive fields before passing to client
  if (!loanData) {
    throw new Error('Loan data not found');
  }

  const safeLoanData = {
    id: loanData.id,
    file_no: loanData.file_no,
    state: loanData.state,
    branch: loanData.branch,
    centre_name: loanData.centre_name,
    area: loanData.area,
    loan_category: loanData.loan_category,
    loan_type: loanData.loan_type,
    product: loanData.product,
    scheme_name: loanData.scheme_name,
    gender: loanData.gender,
    customer_segment: loanData.customer_segment,
    area_type: loanData.area_type,
    caste: loanData.caste,
    loan_amount: loanData.loan_amount,
    installments: loanData.installments,
    interest: loanData.interest,
    disbursement_amount: loanData.disbursement_amount,
    emi: loanData.emi,
    first_due_date: loanData.first_due_date?.toISOString(),
    total_amt: loanData.total_amt,
    last_due_date: loanData.last_due_date?.toISOString(),
    installment_due_day: loanData.installment_due_day,
    repayment_type: loanData.repayment_type,
    disbursement_type: loanData.disbursement_type,
    disbursement_date: loanData.disbursement_date?.toISOString(),
    disbursement_status: loanData.disbursement_status,
    processing_fee: loanData.processing_fee,
    service_tax: loanData.service_tax,
    cersai_fee: loanData.cersai_fee,
    insurance_type: loanData.insurance_type,
    property_insurance: loanData.property_insurance,
    life_insurance: loanData.life_insurance,
    total_insurance: loanData.total_insurance,
    agreement_date: loanData.agreement_date?.toISOString(),
    loan_status: loanData.loan_status,
    property_value: loanData.property_value,
    property_area: loanData.property_area,
    work_profile_category: loanData.work_profile_category,
    work_sub_category: loanData.work_sub_category,
    work_profile: loanData.work_profile,
    loan_predicted: loanData.loan_predicted,
    cibil_score: loanData.cibil_score,
    short_risk_summary: loanData.short_risk_summary,
    full_summary_url: loanData.full_summary_url,
    risk_score: loanData.risk_score,
    total_processing_fee: loanData.total_processing_fee,
    total_processing_fee_with_tax: loanData.total_processing_fee_with_tax,
    legal_charges: loanData.legal_charges,
    valuation_charges: loanData.valuation_charges,
    total_legal_charges: loanData.total_legal_charges,
    deductions: loanData.deductions,
    advance_emi: loanData.advance_emi,
    
  };

  return (
    <LoanReportClient
          loanData={safeLoanData}
          riskDistribution={riskDistribution}
          loanByState={loanByState} cibilVsLoanData={[]} repaymentVsLoanData={[]} loanToIncomeVsCibil={[]} riskScoreDistribution={[]}    />
  );
}