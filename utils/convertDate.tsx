const convertDateFormat = (inputDate: string): string => {
  const [year, month, day] = inputDate.split("-");
  return `${day}-${month}-${year}`;
};

export default convertDateFormat;
