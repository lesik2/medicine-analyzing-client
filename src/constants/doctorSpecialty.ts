import { OptionShape } from "@alfalab/core-components/select/typings";

export const doctorSpecialty = {
  'Общая практика': 'Врач общей практики',
  'Акушерство и гинекология': 'Врач-акушер-гинеколог',
  Хирургия: 'Врач-хирург',
  Стоматология: 'Врач-стоматолог',
  Терапия: 'Врач-терапевт',
  Офтальмология: 'Врач-офтальмолог',
  Педиатрия: 'Врач-педиатр',
  Кардиология: 'Врач-кардиолог',
  Неврология: 'Врач-невролог',
  Эндокринология: 'Врач-эндокринолог',
  Дерматология: 'Врач-дерматолог',
  Психиатрия: 'Врач-психиатр',
} as const;


export const doctorSpecialtyOptions: OptionShape[] = Object.entries(
  doctorSpecialty,
).map(([key, value]) => ({
  key,
  content: value,
}));