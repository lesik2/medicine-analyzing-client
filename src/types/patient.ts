import { Gender, AgeCategory } from '.';

export interface Patient {
  id: string;
  fullName: string;
  gender: Gender;
  ageCategory: AgeCategory;
  dateOfBirth: string;
  active: boolean;
}

export interface getAllPatientResponse {
  id: string;
  ageCategory: AgeCategory;
  patient: Patient | null;
}

export interface UpdatePatient {
  id?: string;
  name: string;
  dateOfBirth: string;
  ageCategory: string;
  surname: string;
  patronymic?: string;
  gender: string;
}

export interface PatientResponse {
  id: string;
  name: string;
  surname: string;
  patronymic?: string;
  gender: Gender;
  dateOfBirth: Date;
  ageCategory: AgeCategory;
}



export interface UpdateActiveStatus{
  id: string;
}