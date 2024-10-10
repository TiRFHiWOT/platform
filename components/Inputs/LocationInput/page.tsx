const LocationInput = ({ location, setLocation }) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 font-semibold mb-2"
        htmlFor="location"
      >
        Location
      </label>
      <input
        id="location"
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        required
      />
    </div>
  );
};

export default LocationInput;
