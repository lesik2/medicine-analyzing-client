import { AgeCategory } from "@/types"

export const config = {
    getAddPatientMessage: (ageCategory: AgeCategory) => `Добавить пациента (${ageCategory})`
};