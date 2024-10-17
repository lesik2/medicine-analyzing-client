export const getTitleName = (title: string, id?: string) => {
  return `${id ? 'Редактирование' : 'Добавление'} ${title}`;
};
