import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import EventCard from "../../components/EventCard/page";
import { fetchEvents } from "@/redux/eventSlice";
import SearchBar from "../../components/SearchBar/page";
import Head from "next/head";

const EventsPage = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);

  // State for Search Input
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Filtered Events based on search input
  const filteredEvents = events?.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Local Events - Discover Events Near You</title>
        <meta
          name="description"
          content="Find and discover local events near you, explore categories, dates, and locations."
        />
        <meta
          name="keywords"
          content="events, local events, discover events, concerts, shows, festivals"
        />
      </Head>
      <div className="py-12 bg-gradient-to-b from-blue-100 to-white min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              Discover Local Events
            </h1>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>

          {loading ? (
            <div>H</div> // Show spinner while loading
          ) : error ? (
            <p className="text-red-500">Error loading events: {error}</p>
          ) : filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={{
                    title: event.title,
                    date: event.date,
                    time: event.time,
                    location: event.location,
                    price: event.price || "Free", // Show "Free" if no price
                    image: event.image,
                    description: event.description,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No events match your search.</p>
              <Link href="/categories">
                <div className="text-blue-500 hover:underline cursor-pointer mt-4">
                  Browse all event categories
                </div>
              </Link>
            </div>
          )}

          {/* Pagination Component can be added here */}
        </div>
      </div>
    </>
  );
};

export default EventsPage;
