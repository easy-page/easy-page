import { Dayjs } from "dayjs";

export const isBeforeOrEqPeriod = (day1: Dayjs, day2: Dayjs) => {
  console.log('day2 hour:', day1.get('hour'), day2.get('hour'))
  if (day1.get('hour') < day2.get('hour')) {
    return true;
  }
  if (day1.get('hour') === day2.get('hour')) {
    return day1.get('minute') <= day2.get('minute');
  }
  return false;
}