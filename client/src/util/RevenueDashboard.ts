type monthAndRevenue = {
  month: string;
  year: number;
  total: number;
};
type Revenue = {
  month: number;
  year: number;
  total: number;
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const get3MonthsNearest = () => {
  const months = [];
  const now = new Date();

  for (let i = 0; i < 3; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(date.getMonth()); // +1 to convert from 0-indexed
  }

  return months;
};

//Incremental Revenue (Revenue per Period)
const standardRevenue = (revenueArray: Revenue[]) => {
  // NOTE: only get payment is Done (in server)
  // get 3 month latest
  // Ex: [12,11,10]
  const final: monthAndRevenue[] = [];
  if (revenueArray.length === 0) return final;
  const getMonthLatest = get3MonthsNearest();
  for (let i = 0; i < getMonthLatest.length; i++) {
    if (
      revenueArray[i] !== undefined &&
      Number(revenueArray[i].month) - 1 === getMonthLatest[i]
    ) {
      //Assume server response [{month,revenue}...]
      final.push({
        month: monthNames[getMonthLatest[i]],
        total: revenueArray[i].total,
        year: revenueArray[i].year,
      });
    } else
      final.push({
        month: monthNames[getMonthLatest[i]],
        total: 0,
        year: new Date().getFullYear(),
      });
  }
  return final.reverse();
};

export { standardRevenue };
