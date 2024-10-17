import { useReducer } from 'react';

interface PayloadType {
  type: SetOfficeFiler;
  payload: string;
}

enum SetOfficeFiler {
  SET_STATUS_FILTER = 'SET_STATUS_FILTER',
  SET_SPECIALTY_FILTER = 'SET_SPECIALTY_FILTER',
}

const initialState = {
  statusFilter: '',
  specialtyFilter: '',
};

const filterReducer = (state: typeof initialState, action: PayloadType) => {
  switch (action.type) {
    case SetOfficeFiler.SET_STATUS_FILTER:
      return {
        ...state,
        statusFilter:
          action.payload === state.statusFilter ? '' : action.payload,
      };
    case SetOfficeFiler.SET_SPECIALTY_FILTER:
      return {
        ...state,
        specialtyFilter:
          action.payload === state.specialtyFilter ? '' : action.payload,
      };
    default:
      return state;
  }
};

export const useOfficeFilters = () => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  const setStatus = (status: string) => {
    dispatch({ type: SetOfficeFiler.SET_STATUS_FILTER, payload: status });
  };

  const setSpecialty = (specialty: string) => {
    dispatch({ type: SetOfficeFiler.SET_SPECIALTY_FILTER, payload: specialty });
  };

  return {
    filters: {
      statusFilter: state.statusFilter,
      specialtyFilter: state.specialtyFilter,
    },
    set: {
      setStatus,
      setSpecialty,
    },
  };
};
