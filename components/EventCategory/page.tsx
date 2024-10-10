import { Music, Video, Users, BookOpen, Calendar, Cloud } from "react-feather";

const EventCategory = () => {
  const categories = [
    { name: "Concerts", icon: <Music className="text-gray-900 text-6xl" /> },
    {
      name: "Workshops",
      icon: <BookOpen className="text-gray-900 text-6xl" />,
    },
    { name: "Festivals", icon: <Cloud className="text-gray-900 text-6xl" /> },
    {
      name: "Exhibitions",
      icon: <Calendar className="text-gray-900 text-6xl" />,
    },
    { name: "Meetups", icon: <Users className="text-gray-900 text-6xl" /> },
    { name: "Webinars", icon: <Video className="text-gray-900 text-6xl" /> },
  ];

  return (
    <div className="bg-gray-100 py-10 px-20">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Top Categories
      </h1>
      <div className="flex flex-wrap justify-between">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 border border-transparent hover:bg-gray-300 hover:border-gray-200 rounded-xl"
          >
            <div className="flex items-center justify-center p-5 border border-gray-600 rounded-full mb-2 text-gray-600">
              {category.icon}
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              {category.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCategory;
