import { Specialty, TypesOfShifts } from '.';

export interface DoctorResponse {
  id: string;
  fullName: string;
  specialty: Specialty;
  typeOfShifts: TypesOfShifts;
  officeNumber: number;
}

export interface GetAllDoctorsResponse {
  total: number;
  items: DoctorResponse[];
}

export interface CreateDoctor {
  name: string;
  surname: string;
  patronymic?: string;
  specialty: string;
  typeOfShifts: string;
  email: string;
  officeId?: string;
}
