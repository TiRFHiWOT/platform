import EventCard from "../EventCard/page";
import useFormattedDate, { formatTime } from "@/utiles/useFormattedDate";

const EventsDisplay = ({ title, label, filteredEvents }) => {
  return (
    <div>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">{label}</h2>
        <p className="text-gray-500 mb-6">
          Lorem ipsum dolor sit amet consectetur.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {(title === "Featured"
            ? filteredEvents.slice(0, 4)
            : filteredEvents
          ).map((event) => {
            const formattedDate = useFormattedDate(event.date);
            const formattedTime = formatTime(event.time);

            return (
              <EventCard
                key={event.id}
                event={{
                  id: event.id,
                  title: event.title,
                  date: formattedDate,
                  time: formattedTime,
                  location: event.location,
                  price: event.price || "Free",
                  image: event.image,
                  description: event.description,
                }}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default EventsDisplay;
