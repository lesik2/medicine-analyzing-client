import { Gender, AgeCategory } from '.';

export interface Patient {
  id: string;
  fullName: string;
  gender: Gender;
  ageCategory: AgeCategory;
  dateOfBirth: Date;
  address: string;
  userId: string;
}

export interface getAllPatientResponse{
    id: string;
    ageCategory:AgeCategory;
    patient: Patient|null;
}