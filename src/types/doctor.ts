import { OptionShape } from '@alfalab/core-components/select/shared';
import { Specialty, TypesOfShifts } from '.';

export interface DoctorResponse {
  id: string;
  fullName: string;
  specialty: Specialty;
  typeOfShifts: TypesOfShifts;
  officeNumber: number | null;
}

export interface GetAllDoctorsResponse {
  total: number;
  items: DoctorResponse[];
}

export interface UpdateDoctor {
  id?: string;
  name: string;
  surname: string;
  patronymic?: string;
  specialty: string;
  typeOfShifts: string;
  email: string;
  officeId?: string;
}


export interface DoctorResponse{
  id: string;
  email: string;
  fullName:string;
  specialty: Specialty;
  typeOfShifts: TypesOfShifts;
  office: OptionShape;
}
