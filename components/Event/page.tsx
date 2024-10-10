import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { fetchEvents } from "@/redux/eventSlice";
import EventsDisplay from "../EventsDisplay/page";

const EventsPage = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <div className="py-12 bg-gray-200 border-b">
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

        {loading ? (
          <p className="text-black">Loading events...</p>
        ) : error ? (
          <p>Error loading events: {error}</p>
        ) : events.length > 0 ? (
          <div className="">
            <EventsDisplay title="Featured" label="" filteredEvents={events} />
          </div>
        ) : (
          <p>No events match your search.</p>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
