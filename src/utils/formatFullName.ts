export const formatFullName = (fullName: string) => {
  const [surname, name, patronymic] = fullName.split(' ');
  return `${surname} ${getFirstLetterFromText(name)}${getFirstLetterFromText(patronymic)}`;
};

const getFirstLetterFromText = (text: string) => {
  return text ? `${text.charAt(0)}.` : '';
};
