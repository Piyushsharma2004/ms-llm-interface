// lib/db.ts
import { neon } from '@neondatabase/serverless';

export async function getLoanData(uniqueId: string) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const result = await sql`
      SELECT 
        id,
        file_no,
        state,
        branch,
        centre_name,
        area,
        quarter,
        entity_type,
        loan_category,
        loan_type,
        product,
        scheme_name,
        gender,
        customer_segment,
        area_type,
        caste,
        types_of_case,
        loan_segment,
        property_type,
        mortgage_type,
        source_type,
        loan_amount,
        installments,
        interest,
        disbursement_amount,
        emi,
        first_due_date,
        total_amt,
        last_due_date,
        installment_due_day,
        repayment_type,
        disbursement_type,
        disbursement_date,
        disbursement_status,
        processing_fee,
        service_tax,
        cersai_fee,
        insurance_type,
        property_insurance,
        life_insurance,
        total_insurance,
        agreement_date,
        loan_status,
        property_value,
        property_area,
        work_profile_category,
        work_sub_category,
        work_profile,
        loan_predicted,
        cibil_score,
  short_risk_summary,
  full_summary_url,
  total_processing_fee,
  legal_charges,
  valuation_charges,
  total_legal_charges,
  deductions,
  advance_emi
        created_at
      FROM loan_dashboard_data 
      WHERE id = ${uniqueId}
    `;
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching loan data:', error);
    return null;
  }
}

export async function getRiskDistribution() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const result = await sql`
      SELECT loan_predicted, COUNT(*) as count
      FROM loan_dashboard_data
      GROUP BY loan_predicted
    `;
    return result;
  } catch (error) {
    console.error('Error fetching risk distribution:', error);
    return [];
  }
}

export async function getLoanByState() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const result = await sql`
      SELECT state, SUM(loan_amount) as total_amount
      FROM loan_dashboard_data
      GROUP BY state
    `;
    return result;
  } catch (error) {
    console.error('Error fetching loan by state:', error);
    return [];
  }
}