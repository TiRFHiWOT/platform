const CategoryInput = ({ category, setCategory, categories }) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 font-semibold mb-2"
        htmlFor="Category"
      >
        Event Category
      </label>
      <select
        id="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        required
      >
        <option value="">Select a category</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryInput;
