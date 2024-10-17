import { Specialty, StatusOfOffice, TypesOfShifts } from '.';

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
  status: StatusOfOffice;
}

export interface GetAllOfficesResponse {
  total: number;
  items: OfficeResponse[];
}

export interface UpdateOffice {
  id?: string;
  number: number;
  specialty: string;
}

export interface FreeOffice {
  key: number;
  value: {
    availableShifts: string[];
    id: string;
    number: number;
    specialty: Specialty;
  };
}

export interface OfficeResponse {
  id: string;
  number: number;
  specialty: Specialty;
}
