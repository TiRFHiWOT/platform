import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import EventCard from "../../components/EventCard/page";
import { fetchEvents } from "@/redux/eventSlice";
import SearchBar from "../SearchBar/page";

const EventsPage = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);

  // State for Search Input
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Filtered Events based on search input
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12 bg-gradient-to-b from-blue-100 to-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Discover Local Events
          </h1>
          <Link href="/events">
            <div className="text-blue-600 hover:underline cursor-pointer transition duration-300">
              View All Events
            </div>
          </Link>
        </div>

        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        {loading ? (
          <p>Loading events...</p>
        ) : error ? (
          <p>Error loading events: {error}</p>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={{
                  title: event.title,
                  date: event.date,
                  time: event.time,
                  location: event.location,
                  price: event.price || "Free",
                  image: event.image,
                  description: event.description,
                }}
              />
            ))}
          </div>
        ) : (
          <p>No events match your search.</p>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
