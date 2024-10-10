import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";

export const CountdownTimer = ({
  eventDate,
  theme = "blue",
  showMilestoneAlerts = true,
  eventImage,
  passedMessage = "Event has passed!",
  onComplete,
}) => {
  const [timeLeft, setTimeLeft] = useState({});
  const [isMounted, setIsMounted] = useState(false);
  const [milestoneAlert, setMilestoneAlert] = useState("");

  const calculateTimeLeft = () => {
    const difference = +new Date(eventDate) - +new Date();
    if (difference <= 0) {
      if (onComplete) onComplete();
      return null;
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      percentage: Math.max(
        0,
        100 -
          (difference /
            (+new Date(eventDate) -
              +new Date(eventDate).setFullYear(new Date().getFullYear()))) *
            100
      ),
    };
  };

  useEffect(() => {
    setIsMounted(true);
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [eventDate]);

  useEffect(() => {
    if (timeLeft.days === 0 && timeLeft.hours <= 12 && showMilestoneAlerts) {
      setMilestoneAlert("Only 12 hours left!");
    } else if (
      timeLeft.days === 0 &&
      timeLeft.hours <= 1 &&
      showMilestoneAlerts
    ) {
      setMilestoneAlert("Final hour countdown!");
    } else {
      setMilestoneAlert("");
    }
  }, [timeLeft, showMilestoneAlerts]);

  if (!isMounted || !timeLeft) {
    return (
      <div className="text-center bg-red-600 text-white py-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold">{passedMessage}</h2>
      </div>
    );
  }

  const { days, hours, minutes, seconds, percentage } = timeLeft;

  return (
    <div
      className={`text-center bg-${theme}-600 text-white py-10 rounded-lg mb-8 shadow-lg relative overflow-hidden`}
      role="timer"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Background Image */}
      {eventImage && (
        <Image
          src={eventImage}
          alt="Event background"
          width={200}
          height={200}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
      )}

      <div className="relative z-10">
        {/* Milestone Alert */}
        {milestoneAlert && (
          <div className="text-yellow-300 font-bold animate-pulse text-lg mb-4">
            {milestoneAlert}
          </div>
        )}

        <h2 className="text-4xl font-bold mb-6 text-gray-700">
          Next Big Event Countdown
        </h2>

        <div className="flex text-gray-700 justify-center space-x-6 text-2xl font-semibold">
          <TimeDisplay value={days} label="Days" theme={theme} />
          <TimeDisplay value={hours} label="Hours" theme={theme} />
          <TimeDisplay value={minutes} label="Minutes" theme={theme} />
          <TimeDisplay value={seconds} label="Seconds" theme={theme} />
        </div>

        <div className="relative mt-6 w-full max-w-2xl mx-auto h-4 bg-gray-200 rounded-full">
          <div
            style={{ width: `${percentage}%` }}
            className={`h-full bg-${theme}-600 rounded-full transition-all duration-500`}
          ></div>
        </div>
      </div>
    </div>
  );
};

const TimeDisplay = ({ value, label, theme }) => (
  <div className="text-center">
    <div
      className={`bg-white text-${theme}-600 rounded-md px-6 py-3 shadow-lg transform transition duration-300 ease-in-out hover:scale-105`}
    >
      {value}
    </div>
    <div className="text-sm mt-2">{label}</div>
  </div>
);

CountdownTimer.propTypes = {
  eventDate: PropTypes.string.isRequired,
  theme: PropTypes.string,
  eventImage: PropTypes.string,
  passedMessage: PropTypes.string,
  showMilestoneAlerts: PropTypes.bool,
  onComplete: PropTypes.func,
};

export default CountdownTimer;
