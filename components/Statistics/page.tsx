import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import DashboardLayout from "../DashboardLayout/page";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { saveAs } from "file-saver";
import { fetchEvents } from "@/redux/eventSlice";

const Statistics = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = () => {
      setFilteredEvents(events);
    };

    fetchData();
    const intervalId = setInterval(fetchData, 15000);

    return () => clearInterval(intervalId);
  }, [events]);

  const handleRetry = () => {
    setTimeout(() => {
      setFilteredEvents(events);
    }, 1000);
  };

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  useEffect(() => {
    let filtered = events;
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((event) =>
        selectedCategories.includes(event.category)
      );
    }
    if (searchQuery) {
      filtered = filtered.filter((event) =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredEvents(filtered);
  }, [selectedCategories, searchQuery, events]);

  const exportToCSV = () => {
    const csvData = filteredEvents.map((event) => ({
      name: event.name,
      category: event.category,
      date: event.date,
    }));

    const csvContent = `data:text/csv;charset=utf-8,${[
      ["Name", "Category", "Date"],
      ...csvData.map((event) => [event.name, event.category, event.date]),
    ]
      .map((e) => e.join(","))
      .join("\n")}`;

    const encodedUri = encodeURI(csvContent);
    saveAs(encodedUri, "events.csv");
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 bg-gray-200 min-h-screen rounded-xl border border-gray-300">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            Loading Statistics...
          </h1>
          <Skeleton count={3} height={200} />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-6 bg-red-100 min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-red-600 mb-8">
            Error Loading Data
          </h1>
          <button
            onClick={handleRetry}
            className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg"
          >
            Retry
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const totalEvents = filteredEvents.length;
  const categories = [...new Set(events.map((event) => event.category))];

  const categoryData = categories.map((category) => {
    return {
      name: category,
      count: filteredEvents.filter((event) => event.category === category)
        .length,
    };
  });

  const chartData = {
    labels: categoryData.map((category) => category.name),
    datasets: [
      {
        label: "Events per Category",
        data: categoryData.map((category) => category.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-200 min-h-screen rounded-xl border border-gray-300">
        <div className="flex justify-between mb-6">
          <h1 className="text-4xl font-bold text-gray-800">
            Admin Dashboard Statistics
          </h1>
          <button
            onClick={exportToCSV}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Export CSV
          </button>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <input
            type="text"
            className="border border-gray-400 px-4 py-2 rounded-lg w-full"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center transition-all border border-gray-300">
            <div className="text-green-500 text-6xl mb-4">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-700">Total Events</h2>
            <p className="text-4xl font-semibold text-gray-800">
              {totalEvents}
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 flex flex-col items-center transition-all border border-gray-300">
            <div className="text-blue-500 text-6xl mb-4">
              <i className="fas fa-list-alt"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-700">Categories</h2>
            <p className="text-2xl text-gray-800">
              {categories.length} Categories
            </p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {categories.map((category, index) => (
                <span
                  key={index}
                  onClick={() => handleCategoryToggle(category)}
                  className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                    selectedCategories.includes(category)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 flex flex-col items-center transition-all border border-gray-300">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Event Distribution
            </h2>
            <Bar
              data={chartData}
              options={{ responsive: true, maintainAspectRatio: true }}
            />
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={() => router.push("/admin/add-event")}
            className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg text-xl mx-4"
          >
            Add New Event
          </button>
          <button
            onClick={() => router.push("/admin/events-list")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-xl mx-4"
          >
            View All Events
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Statistics;
