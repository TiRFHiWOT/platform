import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, deleteEvent } from "@/redux/eventSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const EventsList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { events, loading, error } = useSelector((state) => state.events);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
  };

  const handleEdit = (event) => {
    router.push({
      pathname: "/admin/add-event",
      query: {
        id: event.id,
        title: event.title,
        location: event.location,
        date: event.date,
        category: event.category,
        time: event.time,
        description: event.description,
        price: event.price,
        image: event.image,
      },
    });
  };

  return (
    <div className="bg-white text-gray-700 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Manage Events</h2>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-lg w-1/3"
        />
        <select
          className="border p-2 rounded-lg"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          <option value="Tech">Tech</option>
        </select>
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td className="border px-4 py-2">{event.title}</td>
                <td className="border px-4 py-2">{event.location}</td>
                <td className="border px-4 py-2">{event.date}</td>
                <td className="border px-4 py-2">{event.category}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded-lg mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(event)}
                    className="bg-yellow-500 text-white py-1 px-2 rounded-lg"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EventsList;
