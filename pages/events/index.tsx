import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { fetchEvents } from "@/redux/eventSlice";
import SearchBar from "../../components/SearchBar/page";
import Filter from "@/components/EventFilter/page";
import EventsDisplay from "@/components/EventsDisplay/page";
import Layout from "@/components/Layout/page";
import { CountdownTimer } from "@/components/CountDown/page";
import { NewsletterSignup } from "@/components/NewsLetter/page";
import Category from "@/components/EventCategory/page";

const EventsPage = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const filteredEvents = events
    ?.map((event) => ({
      ...event,
      date:
        typeof event.date.toDate === "function"
          ? event.date.toDate().toISOString().split("T")[0]
          : event.date,
    }))
    ?.filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const nextBigEventDate = "2024-12-31T23:59:59";

  const handleComplete = () => {
    alert("Event countdown has completed!");
  };

  return (
    <Layout title="Local Events - Discover Events Near You">
      <div className="py-10 lg:px-16 bg-gray-100 min-h-screen">
        <div className="container mx-auto px-5 ">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              Discover Local Events
            </h1>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>
          <div className="">
            <Filter
              filterLocation={filterLocation}
              setFilterLocation={setFilterLocation}
              filterDate={filterDate}
              setFilterDate={setFilterDate}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
            />
          </div>
          <CountdownTimer
            eventDate={nextBigEventDate}
            theme="green"
            eventImage=""
            onComplete={handleComplete}
            passedMessage="The event has already passed!"
          />
          <Category />
          {loading ? (
            <div className="text-center py-12">
              <p>Loading events...</p>
            </div>
          ) : error ? (
            <p className="text-red-500">Error loading events: {error}</p>
          ) : filteredEvents.length > 0 ? (
            <div>
              <EventsDisplay
                title="Featured"
                label="Featured Events"
                filteredEvents={filteredEvents}
              />
              <EventsDisplay
                title=""
                label="All Events"
                filteredEvents={filteredEvents}
              />
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
          <NewsletterSignup />

          {/* Pagination Component can be added here */}
        </div>
      </div>
    </Layout>
  );
};

export default EventsPage;
