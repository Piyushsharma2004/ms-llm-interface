import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

// Placeholder ML/LLM function with CIBIL score-based risk assessment
async function generateMLFields(data: any) {
  // Determine risk level based on CIBIL score
  let loan_predicted = 'Unknown Risk';
  if (data.cibil_score !== undefined && data.cibil_score !== null) {
    if (data.cibil_score < 600) {
      loan_predicted = 'Very High Risk';
    } else if (data.cibil_score >= 600 && data.cibil_score <= 649) {
      loan_predicted = 'High Risk';
    } else if (data.cibil_score >= 650 && data.cibil_score <= 749) {
      loan_predicted = 'Medium Risk';
    } else if (data.cibil_score >= 750) {
      loan_predicted = 'Low Risk';
    }
  }

  return {
    short_risk_summary: `Processing ${data.file_no} LLM summary`,
    full_summary_url: `Processing PDF Link`,
    loan_predicted,
  };
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Basic validation
    if (!data.file_no) {
      return NextResponse.json(
        { error: 'Missing required field: file_no' },
        { status: 400 }
      );
    }

    // Generate ML/LLM fields
    const { short_risk_summary, full_summary_url, loan_predicted } =
      await generateMLFields(data);

    // Initialize Neon database client
    const sql = neon(process.env.DATABASE_URL!);

    // Corrected SQL query with proper field list and values
    await sql`
      INSERT INTO loan_dashboard_data (
        id, file_no, state, branch, centre_name, area, quarter, entity_type, 
        loan_category, loan_type, product, scheme_name, gender, customer_segment, 
        area_type, caste, types_of_case, loan_segment, property_type, mortgage_type, 
        source_type, loan_amount, installments, interest, disbursement_amount, emi, 
        first_due_date, total_amt, last_due_date, installment_due_day, repayment_type, 
        disbursement_type, disbursement_date, disbursement_status, processing_fee, 
        service_tax, total_processing_fee, cersai_fee, insurance_type, 
        property_insurance, life_insurance, total_insurance, agreement_date, 
        cibil_score, loan_status, property_value, property_area, 
        work_profile_category, work_sub_category, work_profile, 
        short_risk_summary, full_summary_url, loan_predicted, 
        legal_charges, valuation_charges, total_legal_charges, 
        deductions, advance_emi, created_at
      ) VALUES (
        ${data.file_no}, 
        ${data.file_no || null}, 
        ${data.state || null}, 
        ${data.branch || null}, 
        ${data.centre_name || null}, 
        ${data.area || null}, 
        ${data.quarter || null}, 
        ${data.entity_type || null}, 
        ${data.loan_category || null}, 
        ${data.loan_type || null}, 
        ${data.product || null}, 
        ${data.scheme_name || null}, 
        ${data.gender || null}, 
        ${data.customer_segment || null}, 
        ${data.area_type || null}, 
        ${data.caste || null}, 
        ${data.types_of_case || null}, 
        ${data.loan_segment || null}, 
        ${data.property_type || null}, 
        ${data.mortgage_type || null}, 
        ${data.source_type || null}, 
        ${data.loan_amount || null}, 
        ${data.installments || null}, 
        ${data.interest || null}, 
        ${data.disbursement_amount || null}, 
        ${data.emi || null}, 
        ${data.first_due_date || null}, 
        ${data.total_amt || null}, 
        ${data.last_due_date || null}, 
        ${data.installment_due_day || null}, 
        ${data.repayment_type || null}, 
        ${data.disbursement_type || null}, 
        ${data.disbursement_date || null}, 
        ${data.disbursement_status || null}, 
        ${data.processing_fee || null}, 
        ${data.service_tax || null}, 
        ${data.total_processing_fee || null}, 
        ${data.cersai_fee || null}, 
        ${data.insurance_type || null}, 
        ${data.property_insurance || null}, 
        ${data.life_insurance || null}, 
        ${data.total_insurance || null}, 
        ${data.agreement_date || null}, 
        ${data.cibil_score || null}, 
        ${data.loan_status || null}, 
        ${data.property_value || null}, 
        ${data.property_area || null}, 
        ${data.work_profile_category || null}, 
        ${data.work_sub_category || null}, 
        ${data.work_profile || null}, 
        ${short_risk_summary}, 
        ${full_summary_url}, 
        ${loan_predicted}, 
        ${data.legal_charges || null}, 
        ${data.valuation_charges || null}, 
        ${data.total_legal_charges || null}, 
        ${data.deductions || null}, 
        ${data.advance_emi || null}, 
        NOW()
      )
    `;

    return NextResponse.json(
      { message: 'Data uploaded successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error uploading data:', error);
    return NextResponse.json(
      { error: `Failed to upload data: ${error.message}` },
      { status: 500 }
    );
  }
}