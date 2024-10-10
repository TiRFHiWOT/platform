import useFormattedDate from "@/utiles/useFormattedDate";

const DateTimeInput = ({ date, setDate, time, setTime }) => {
  const formattedDate = useFormattedDate(date);

  return (
    <div>
      <div className="w-full mb-4">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="date"
        >
          Event Date/Time
        </label>
        <div className="flex flex-row gap-4">
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        {formattedDate && (
          <p className="text-sm text-gray-500 mt-1">
            Selected Date: {formattedDate}
          </p>
        )}
      </div>
    </div>
  );
};

export default DateTimeInput;
