import Image from "next/image";
import Link from "next/link";
import { FiMapPin, FiClock, FiCalendar, FiDollarSign } from "react-icons/fi";

export default function EventCard({ event }) {
  const imageUrl =
    event.image.startsWith("http") || event.image.startsWith("/")
      ? event.image
      : `/uploads/${event.image}`;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Event Image */}
      <div className="relative h-48">
        <Image
          src={imageUrl}
          alt={event.title}
          layout="fill"
          objectFit="cover"
          className="w-full h-full object-center"
        />
      </div>

      {/* Event Details */}
      <div className="p-6">
        {/* Event Title */}
        <h3 className="text-xl font-semibold text-gray-900 truncate mb-2">
          {event.title}
        </h3>

        {/* Event Date, Time, Location */}
        <div className="text-sm text-gray-600 flex flex-col space-y-1">
          {/* Date */}
          <div className="flex items-center space-x-2">
            <FiCalendar className="text-gray-500" />
            <p>{event.date}</p>
          </div>

          {/* Time */}
          {event.time && (
            <div className="flex items-center space-x-2">
              <FiClock className="text-gray-500" />
              <p>{event.time}</p>
            </div>
          )}

          {/* Location */}
          <div className="flex items-center space-x-2">
            <FiMapPin className="text-gray-500" />
            <p>{event.location}</p>
          </div>
        </div>

        {/* Price */}
        {event.price && (
          <div className="mt-3">
            <span
              className={`inline-flex items-center px-3 py-1 text-sm rounded-full ${
                event.price !== "Free"
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <FiDollarSign className="mr-1" />
              {event.price !== "Free" ? `$${event.price}` : "Free"}
            </span>
          </div>
        )}

        {/* Event Description */}
        <p className="mt-4 text-sm text-gray-700 line-clamp-3 leading-relaxed">
          {event.description}
        </p>

        {/* View Details Button */}
        <div className="mt-5">
          <Link href={`/events/${event.id}`}>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
