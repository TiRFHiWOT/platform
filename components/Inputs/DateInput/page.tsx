import { format } from "date-fns";
import { useState } from "react";

const DateInput = ({}) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const formatDate = (dateString) => {
    const selectedDate = new Date(dateString);
    return format(selectedDate, "EEE, MMM d");
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const time = new Date();
    time.setHours(hours);
    time.setMinutes(minutes);
    return format(time, "hh:mm a") + " EAT";
  };

  return (
    <div className="mb-4 flex flex-col ">
      <div className=" flex flex-row gap-2">
        <div className="w-1/2">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="date"
          >
            Event Date/Time
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <p>Date: {date ? formatDate(date) : "Select a date"}</p>
        </div>
        <div className="w-1/2">
          <label
            className="block text-gray-700 font-semibold mb-8"
            htmlFor="time"
          ></label>
          <input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <p>Time: {time ? formatTime(time) : "Select a time"}</p>
        </div>
      </div>
    </div>
  );
};

export default DateInput;
