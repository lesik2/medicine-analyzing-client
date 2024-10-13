import { TypesOfShifts } from '@/types';
import { DoctorResponseForOffice } from '@/types/office';

export const getCellClassName = (doctors: DoctorResponseForOffice[]) => {
  const hasFullShift = doctors.some(
    (doctor) => doctor.typeOfShifts === TypesOfShifts.FULL_SHIFT,
  );
  const hasFirstShift = doctors.some(
    (doctor) => doctor.typeOfShifts === TypesOfShifts.FIRST_SHIFT,
  );
  const hasSecondShift = doctors.some(
    (doctor) => doctor.typeOfShifts === TypesOfShifts.SECOND_SHIFT,
  );

  if (hasFullShift || (hasFirstShift && hasSecondShift)) {
    return 'green-background';
  } else if (doctors.length === 1) {
    return 'orange-background';
  } else {
    return 'red-background';
  }
};
