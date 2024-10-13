import { Specialty, TypesOfShifts } from '.';

export interface DoctorResponseForOffice {
  id: string;
  fullName: string;
  typeOfShifts: TypesOfShifts;
}

export interface OfficeResponse {
  id: string;
  number: number;
  specialty: Specialty;
  doctors: DoctorResponseForOffice[];
}

export interface GetAllOfficesResponse {
  total: number;
  items: OfficeResponse[];
}

export interface CreateOffice{
  number: number,
  specialty: string,
}