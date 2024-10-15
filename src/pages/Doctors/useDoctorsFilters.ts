import { useReducer } from 'react';

interface PayloadType {
  type: SetDoctorsFiler;
  payload: string;
}

enum SetDoctorsFiler {
  SET_TYPE_OF_SHIFTS_FILTER = 'SET_TYPE_OF_SHIFTS_FILTER',
  SET_SPECIALTY_FILTER = 'SET_SPECIALTY_FILTER',
}

const initialState = {
  typeOfShiftsFilter: '',
  specialtyFilter: '',
};

const filterReducer = (state: typeof initialState, action: PayloadType) => {
  switch (action.type) {
    case SetDoctorsFiler.SET_TYPE_OF_SHIFTS_FILTER:
      return {
        ...state,
        typeOfShiftsFilter:
          action.payload === state.typeOfShiftsFilter ? '' : action.payload,
      };
      case SetDoctorsFiler.SET_SPECIALTY_FILTER:
      return {
        ...state,
        specialtyFilter:
          action.payload === state.specialtyFilter? '' : action.payload,
      };
    default:
      return state;
  }
};

export const useDoctorsFilters = () => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  const setTypeOfShifts = (typeOfShifts: string) => {
    dispatch({ type: SetDoctorsFiler.SET_TYPE_OF_SHIFTS_FILTER, payload: typeOfShifts });
  };

  const setSpecialty = (specialty: string) => {
    dispatch({ type: SetDoctorsFiler.SET_SPECIALTY_FILTER, payload: specialty });
  };

  return {
    filters: {
      typeOfShifts: state.typeOfShiftsFilter,
      specialtyFilter: state.specialtyFilter
    },
    set: {
      setTypeOfShifts,
      setSpecialty,
    },
  };
};
