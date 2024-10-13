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


