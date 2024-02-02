const getPercentage = (value: number, total: number): number => {
  return Math.floor((value / total) * 100);
};

export default getPercentage;
