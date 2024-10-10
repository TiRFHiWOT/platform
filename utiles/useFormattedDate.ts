import { useEffect, useState } from "react";

const useFormattedDate = (dateString, fullFormat = false) => {
  const [formattedDate, setFormattedDate] = useState("");

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const dateObject = new Date(dateString);
    const options = fullFormat
      ? { weekday: "long", year: "numeric", month: "long", day: "numeric" }
      : { weekday: "short", month: "short", day: "numeric" };

    return new Intl.DateTimeFormat("en-US", options).format(dateObject);
  };

  useEffect(() => {
    setFormattedDate(formatDate(dateString));
  }, [dateString]);

  return formattedDate;
};

export const formatTime = (time) => {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes} ${ampm} EAT`;
};

export default useFormattedDate;
