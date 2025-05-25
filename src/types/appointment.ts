import { Specialty } from '.';

export interface Appointment {
  doctorId: string | undefined;
  patientId: string | undefined;
  dateAndTime: string;
}

export interface AppointmentResponse {
  id: string;
  dateAndTime: string;
  patientFullName: string;
  specialty: Specialty;
  doctorFullName: string;
  officeNumber: number | undefined;
  status: string;
}

export interface AppointmentResponseByPatient {
  upcoming: AppointmentResponse[];
  history: AppointmentResponse[];
}

export interface WorkloadItem {
  label: string;
  value: number;
}

export interface WorkloadResponse {
  labels: string[];
  items: WorkloadItem[];
  total: number;
}
