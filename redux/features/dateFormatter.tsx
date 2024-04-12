export const labelFormatter = (labels: any, days: string) => {
  let newArr = labels;
  switch (days) {
    case "1":
      newArr = labels.map((num: number) => {
        const time = new Date(num);
        const hours = time.getHours();
        let minutes =
          time.getMinutes() < 10 ? time.getMinutes() + "0" : time.getMinutes();
        return hours + ":" + minutes;
      });
      break;
    case "7":
    case "14":
    case "30":
    case "180":
    case "365":
      newArr = labels.map((num: number) => {
        const time = new Date(num);
        return time.toLocaleString("en-US", { month: "short", day: "numeric" });
      });
      break;
    case "1826":
      newArr = labels.map((num: number) => {
        const time = new Date(num);
        return time.toLocaleString("en-us", {
          month: "short",
          year: "numeric",
        });
      });
  }

  return newArr;
};
