const formatTime = (timeDay: string, days: string): string => {
  const date = new Date(timeDay);
  const isWithinYear = parseFloat(days) < 365;

  if (isWithinYear) {
    const hours = date.getHours().toString().padStart(2, "0");
    return `${hours}h`;
  } else {
    const month = date.getMonth();
    const year = date.getFullYear().toString().slice(2);
    return `${month}/${year}`;
  }
};

export default formatTime;
