const DescriptionInput = ({ description, setDescription }) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 font-semibold mb-2"
        htmlFor="description"
      >
        Event Description
      </label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        rows="4"
        placeholder="Enter event details"
        required
      />
    </div>
  );
};

export default DescriptionInput;
