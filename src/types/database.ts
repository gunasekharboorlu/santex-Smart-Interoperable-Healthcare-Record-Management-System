export type Role = 'gov_admin' | 'hospital_admin' | 'doctor' | 'patient';
export type RequestStatus = 'pending' | 'approved' | 'rejected';

export interface User {
  id: string;
  role: Role;
  full_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  created_at: string;
}

export interface Hospital {
  id: string;
  name: string;
  location: string;
  status: string;
  created_at: string;
}

export interface Doctor {
  id: string;
  user_id: string;
  hospital_id: string;
  specialization: string;
  license_no: string;
  experience?: string;
}

export interface Patient {
  id: string;
  user_id: string;
  blood_group?: string;
  allergies?: string;
  emergency_contact?: string;
  age?: number;
  gender?: string;
}

export interface Report {
  id: string;
  patient_id: string;
  doctor_id?: string;
  title: string;
  description?: string;
  report_type?: string;
  file_url: string;
  is_sensitive: boolean;
  uploaded_at: string;
}

export interface AccessRequest {
  id: string;
  doctor_id: string;
  patient_id: string;
  report_id?: string;
  status: RequestStatus;
  created_at: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  hospital_id: string;
  appointment_date: string;
  status: string;
  created_at: string;
}
