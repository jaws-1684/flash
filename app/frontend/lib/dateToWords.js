import {
  parseISO,
  isToday,
  isYesterday,
  differenceInCalendarISOWeeks,
  isThisMinute,
  isThisHour,
  isThisSecond,
} from "date-fns";

export function dateToWords(isoDate) {
  const today = new Date();
  const date = parseISO(isoDate);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  if (isThisMinute(date)) {
    return "Just now";
  }
  if (isThisHour(date)) {
    return "An hour ago";
  }
  if (isToday(date)) {
    return "Today";
  }
  if (isYesterday(date)) {
    return "Yesterday";
  }
  if (differenceInCalendarISOWeeks(date, today) <= 1) {
    return date.toLocaleDateString("en-US", options).split(",")[0];
  }

  return date.toLocaleDateString("en-US", options);
}

export function formatTime(time) {
  let date = new Date(time)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${hours}:${minutes}`
}