import { FuzzyDate } from "@root/src/__generated__/graphql";
import { format } from "date-fns";

const formatDayAndMonth = (date: FuzzyDate): string => {
  if (!date.day || !date.month || !date.year) return "";
  return format(new Date(date.year, date.month, date.day), "dd/MM");
};

//TODO: Implement the following function
// const formatSecondsToMinsAndHours = (seconds: number): string => {};

export { formatDayAndMonth };
