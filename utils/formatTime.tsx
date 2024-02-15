const formatTime = (timestamp: string, days: string): string => {
  const date: Date = new Date(timestamp);

  if (parseFloat(days) < 365) {
    const hours: number = date.getHours();
    return `${hours.toString().padStart(2, "0")}h`;
  }

  const month: number = date.getMonth();
  const year: string = date.getFullYear().toString().slice(2);

  return `${month}/${year}`;
};

export default formatTime;
