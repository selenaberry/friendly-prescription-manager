
export type PrescriptionStatus = 'pending' | 'filled' | 'ready' | 'picked-up' | 'cancelled';

export type Prescription = {
  id: string;
  patientName: string;
  patientId: string;
  medication: string;
  dosage: string;
  quantity: number;
  doctor: string;
  dateIssued: string;
  dateExpires: string;
  status: PrescriptionStatus;
  refillsRemaining: number;
  refillsTotal: number;
  instructions: string;
  notes?: string;
};
