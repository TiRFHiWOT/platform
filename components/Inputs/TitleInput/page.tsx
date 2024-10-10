const TitleInput = ({ title, setTitle }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-2" htmlFor="title">
        Event Title
      </label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        required
      />
    </div>
  );
};

export default TitleInput;
