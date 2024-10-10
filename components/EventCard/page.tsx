import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiDollarSign } from "react-icons/fi";

export default function EventCard({ event }) {
  if (!event) {
    return null;
  }

  const imageUrl =
    event.image.startsWith("http") || event.image.startsWith("/")
      ? event.image
      : `/uploads/${event.image}`;

  return (
    <Link href={`/events/${event.id}`}>
      <div className="bg-transparent overflow-hidden group border-gray-300 cursor-pointer">
        <div className="relative h-48">
          <Image
            src={imageUrl}
            alt={event.title}
            layout="fill"
            objectFit="cover"
            className="w-full h-full object-center transition-all duration-300 transform rounded-lg group-hover:opacity-80"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-2xl font-semibold text-black text-opacity-90 mb-3 px-2 pt-2 group-hover:underline transform transition-all duration-300">
            {event.title}
          </h3>

          <div className="text-sm text-gray-600 flex flex-col space-y-2 mb-2 px-2 py-[5px] bg-blue-100 rounded-lg border border-gray-300">
            <div className="flex flex-row gap-1">
              <div className="flex items-center space-x-2 text-gray-700 font-medium">
                <FiCalendar className="text-gray-600" size={20} />
                <p>{event.date}</p>
              </div>
              <p className=" scale-75 text-black">•</p>
              {event.time && (
                <div className="flex items-center space-x-2 text-gray-700 font-medium">
                  <p>{event.time}</p>
                </div>
              )}
            </div>

            <div className="flex items-center font-semibold space-x-2 text-gray-600 tracking-wider">
              <p className="text-lg">@</p>
              <p>{event.location}</p>
            </div>
          </div>

          {event.price && (
            <div className="mt-2 mb-4">
              <span
                className={`inline-flex items-center px-2 py-1 text-sm rounded-full ${
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

          <p className="hidden mt-2 text-sm text-gray-700 line-clamp-3 leading-relaxed mb-4">
            {event.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
