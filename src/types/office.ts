import { Specialty, Status, TypesOfShifts } from '.';

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
  status: Status;
}

export interface GetAllOfficesResponse {
  total: number;
  items: OfficeResponse[];
}

export interface CreateOffice {
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

