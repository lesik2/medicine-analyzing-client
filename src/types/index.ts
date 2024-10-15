export interface ServerResponseError {
  message: string;
  error: string;
  statusCode: number;
}

export interface ApiSendConfig {
  method: 'post' | 'patch';
  url: string;
  invalidateKey?: string[];
}

export interface ApiGetConfig {
  url: string;
  keys: unknown[];
}

export enum Specialty {
  GENERAL_PRACTICE = 'Общая практика',
  OBSTETRICS = 'Акушерство и гинекология',
  SURGERY = 'Хирургия',
  DENTISTRY = 'Стоматология',
  THERAPY = 'Терапия',
  OPHTHALMOLOGY = 'Офтальмология',
  PEDIATRICS = 'Педиатрия',
  CARDIOLOGY = 'Кардиология',
  NEUROLOGY = 'Неврология',
  ENDOCRINOLOGY = 'Эндокринология',
  DERMATOLOGY = 'Дерматология',
  MENTAL_HEALTH = 'Психиатрия',
}

export enum TypesOfShifts {
  FIRST_SHIFT = 'Первая смена',
  SECOND_SHIFT = 'Вторая смена',
  FULL_SHIFT = 'Полная смена',
}

export enum StatusOfOffice {
  FILLED = 'Полный состав',
  PARTIALLY_FILLED = 'Один сотрудник',
  EMPTY = 'Нет сотрудников',
}
