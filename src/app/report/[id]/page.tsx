// app/report/[id]/page.tsx
import { Metadata } from 'next';
import LoanReportClient from './LoanReportClient';
import { getLoanData, getRiskDistribution, getLoanByState } from '../../../lib/db';

export function generateMetadata(
  { params }: { params: { id: string } }
): Metadata {
  return {
    title: `Loan Report - ${decodeURIComponent(params.id)}`,
  };
}


// PageProps remains unchanged
type PageProps = {
  params: {
    id: string;
  };
};

export default async function LoanReport(props: PageProps) {

  const { params } = props; 
  const id = decodeURIComponent(params.id);
  console.log(id)

  const loanData = await getLoanData(id);
  const riskDistribution = await getRiskDistribution();
  const loanByState = await getLoanByState();

  if (!loanData) {
    return (
      <div className="text-red-500 p-6 text-center">
        Loan data not found for ID: {id}
      </div>
    );
  }

  const formatDate = (date: Date | string | null | undefined) =>
    date ? new Date(date).toISOString() : undefined;

  const safeLoanData = {
    ...loanData,
    id: loanData.id,
    first_due_date: formatDate(loanData.first_due_date),
    last_due_date: formatDate(loanData.last_due_date),
    disbursement_date: formatDate(loanData.disbursement_date),
    agreement_date: formatDate(loanData.agreement_date),
  };

  return (
    <LoanReportClient
      loanData={safeLoanData}
      riskDistribution={riskDistribution}
      loanByState={loanByState}
      cibilVsLoanData={[]}
      repaymentVsLoanData={[]}
      loanToIncomeVsCibil={[]}
      riskScoreDistribution={[]}
    />
  );
}
//