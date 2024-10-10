import React from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaMapMarkerAlt, FaCalendarAlt, FaMusic } from "react-icons/fa";

const Filter = ({
  filterLocation,
  setFilterLocation,
  filterDate,
  setFilterDate,
  filterCategory,
  setFilterCategory,
}) => {
  const locationOptions = [
    { value: "", label: "All Locations" },
    { value: "New York", label: "New York" },
    { value: "Los Angeles", label: "Los Angeles" },
    { value: "Chicago", label: "Chicago" },
    { value: "Miami", label: "Miami" },
  ];

  const categoryOptions = [
    { value: "", label: "All Categories" },
    { value: "Concert", label: "Concert" },
    { value: "Festival", label: "Festival" },
    { value: "Theatre", label: "Theatre" },
    { value: "Comedy", label: "Comedy" },
  ];

  return (
    <div className="filters text-gray-700 p-6 bg-gray-100 border border-gray-200 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        {/* Location Filter */}
        <div className="flex flex-col w-full md:w-1/3">
          <label
            htmlFor="location"
            className="mb-2 text-gray-800 flex items-center"
          >
            <FaMapMarkerAlt className="inline mr-2 text-gray-600" />
            Location
          </label>
          <Select
            id="location"
            value={locationOptions.find(
              (option) => option.value === filterLocation
            )}
            onChange={(selectedOption) =>
              setFilterLocation(selectedOption.value)
            }
            options={locationOptions}
            className="rounded focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
            aria-label="Filter by location"
          />
        </div>

        {/* Date Filter */}
        <div className="flex flex-col w-full md:w-1/3">
          <label
            htmlFor="date"
            className="mb-2 text-gray-800 flex items-center"
          >
            <FaCalendarAlt className="inline mr-2 text-gray-600" />
            Date
          </label>
          <DatePicker
            id="date"
            selected={filterDate ? new Date(filterDate) : null}
            onChange={(date) => setFilterDate(date)}
            dateFormat="yyyy-MM-dd"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
            aria-label="Filter by date"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-col w-full md:w-1/3">
          <label
            htmlFor="category"
            className="mb-2 text-gray-800 flex items-center"
          >
            <FaMusic className="inline mr-2 text-gray-600" />
            Category
          </label>
          <Select
            id="category"
            value={categoryOptions.find(
              (option) => option.value === filterCategory
            )}
            onChange={(selectedOption) =>
              setFilterCategory(selectedOption.value)
            }
            options={categoryOptions}
            className="rounded focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
            aria-label="Filter by category"
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
