import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div>
      <div className="relative">
        <span className="absolute left-3 top-2 text-gray-500">🔍</span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search events..."
          className="w-full pl-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
      </div>
    </div>
  );
};

export default SearchBar;
