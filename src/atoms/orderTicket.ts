import { atom } from 'jotai';

interface Patient {
  id: string;
  fullName: string;
}

interface Doctor {
  id: string;
  fullName: string;
  officeNumber: number;
}

interface OrderTicketProps {
  specialty: string;
  doctor: Doctor | null;
  dateAndTime: number;
  patient: Patient | null;
}

export const orderTicketAtom = atom<OrderTicketProps>({
  specialty: '',
  doctor: null,
  dateAndTime: 0,
  patient: null,
});

export const clearOrderTicketAtom = atom(null, (_get, set) => {
  set(orderTicketAtom, {
    specialty: '',
    doctor: null,
    dateAndTime: 0,
    patient: null,
  });
});

export const setSpecialtyAtom = atom(null, (_get, set, payload: string) => {
  const currentOrderTicket = _get(orderTicketAtom);
  set(orderTicketAtom, {
    ...currentOrderTicket,
    specialty: payload,
  });
});

export const setDoctorIdAtom = atom(null, (_get, set, payload: Doctor) => {
  const currentOrderTicket = _get(orderTicketAtom);
  set(orderTicketAtom, {
    ...currentOrderTicket,
    doctor: payload,
  });
});

export const setDateAndTimeAtom = atom(null, (_get, set, payload: number) => {
  const currentOrderTicket = _get(orderTicketAtom);
  set(orderTicketAtom, {
    ...currentOrderTicket,
    dateAndTime: payload,
  });
});

export const setPatientIdAtom = atom(null, (_get, set, payload: Patient) => {
  const currentOrderTicket = _get(orderTicketAtom);
  set(orderTicketAtom, {
    ...currentOrderTicket,
    patient: payload,
  });
});

export const getSpecialtyAtom = atom((get) => {
  return get(orderTicketAtom).specialty;
});

export const getDoctorAtom = atom((get) => {
  return get(orderTicketAtom).doctor;
});

export const getDateAndTimeAtom = atom((get) => {
  return get(orderTicketAtom).dateAndTime;
});

export const getPatientAtom = atom((get) => {
  return get(orderTicketAtom).patient;
});
