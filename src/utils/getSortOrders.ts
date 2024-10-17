export const getSortOrders = (isSortedDesc: boolean | undefined) => {
  if (isSortedDesc === undefined) {
    return undefined;
  }
  return isSortedDesc ? 'DESC' : 'ASC';
};
