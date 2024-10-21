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
}

export interface AppointmentResponseByPatient {
  upcoming: AppointmentResponse[];
  history: AppointmentResponse[];
}
