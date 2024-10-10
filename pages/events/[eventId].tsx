import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { FiCalendar, FiDollarSign, FiMapPin, FiShare2 } from "react-icons/fi";
import { fetchEvents } from "@/redux/eventSlice";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Layout from "@/components/Layout/page";
import useFormattedDate from "@/utiles/useFormattedDate";
import { formatTime } from "@/utiles/useFormattedDate";

dayjs.extend(relativeTime);

const EventDetailPage = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const dispatch = useDispatch();

  const { events, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const event = eventId ? events.find((e) => e.id === eventId) : null;

  const formattedDate = useFormattedDate(event ? event.date : null, true);
  const formattedTime = formatTime(event ? event.time : "");

  if (loading)
    return (
      <div className="text-center text-lg mt-40">
        <div className="animate-pulse">Loading event details...</div>
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-600 text-lg mt-40">
        Error: {error}
      </div>
    );
  if (!eventId)
    return <div className="text-center text-lg mt-40">No event selected!</div>;
  if (!event)
    return <div className="text-center text-lg mt-40">No event found!</div>;

  const imageUrl =
    event.image.startsWith("http") || event.image.startsWith("/")
      ? event.image
      : `/uploads/${event.image}`;

  return (
    <Layout
      title={`${event.title} | Event Details`}
      description={event.description}
    >
      <div className="py-8 lg:px-28 border-b border-gray-300">
        <h1 className="text-black text-3xl font-extrabold mb-2">
          {event.title}
        </h1>
        <p className="text-gray-500">Hosted by: ADT production</p>
      </div>
      <div className="container py-5 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row p-4 gap-20">
          <div className="w-full md:w-2/3">
            <div className="relative h-96">
              <Image
                src={imageUrl}
                alt={event.title}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <div className="mt-3">
              <h1 className="text-xl font-semibold text-gray-800 py-1">
                Details
              </h1>
              <p className=" text-gray-800 font-medium tracking-wider">
                {event.description}
              </p>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/3">
            <div className="flex flex-row items-center gap-5 rounded-lg p-5 bg-white mb-5">
              <div className="w-1/3">
                <Image
                  src={imageUrl}
                  alt={event.title}
                  objectFit="cover"
                  width={100}
                  height={100}
                  className="rounded-full h-16 w-16"
                />
              </div>
              <h1 className="font-semibold text-gray-800">{event.title}</h1>
            </div>
            <div className="rounded-lg p-5 bg-white">
              <div className="flex text-gray-600 gap-5 mb-5">
                <div className=" text-gray-700">
                  <FiCalendar size={25} />
                </div>
                <div className="flex flex-col ">
                  <p>{formattedDate}</p>
                  <p>{formattedTime}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-600 gap-5">
                <div className=" text-gray-700">
                  <FiMapPin size={25} />
                </div>
                <p>{event.location}</p>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center mt-5 gap-5 p-5 bg-white rounded-full">
              {event.price && (
                <div className="mt-2">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full ${
                      event.price !== "Free"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <FiDollarSign className="mr-1" />
                    {event.price !== "Free" ? `${event.price}` : "Free"}
                  </span>
                </div>
              )}

              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
                Book Now
              </button>
            </div>

            <div className="flex items-center justify-between mt-4 space-x-3">
              <button className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-500 rounded-lg">
                <FiShare2 className="mr-1" />
                Share
              </button>
              <button
                className="px-2 py-1 bg-blue-100 text-blue-500 rounded-lg"
                onClick={() =>
                  navigator.clipboard.writeText(window.location.href)
                }
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetailPage;
