export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  patientAge: number;
  doctorName: string;
  department: string;
  date: string;
  timeSlot: string;
  reason: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  createdAt: string;
  isIVFSpecial?: boolean;
}

export interface PatientHistory {
  id: string;
  patientName: string;
  patientPhone: string;
  age: number;
  gender: string;
  bloodGroup: string;
  records: MedicalRecord[];
  ivfTimeline?: IVFStep[];
}

export interface MedicalRecord {
  id: string;
  date: string;
  type: 'Prescription' | 'Lab Report' | 'Scan' | 'Consultation';
  title: string;
  doctorName: string;
  notes: string;
  attachments?: string[];
  metrics?: {
    bp?: string;
    weight?: string;
    hbLevel?: string;
    betaHcg?: string; // Specific for IVF tracking
  };
}

export interface IVFStep {
  stage: string;
  date: string;
  status: 'Completed' | 'Active' | 'Upcoming';
  description: string;
  notes?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  isVerified: boolean;
}
