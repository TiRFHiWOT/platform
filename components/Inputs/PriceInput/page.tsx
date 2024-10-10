const PriceInput = ({ price, setPrice }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-2" htmlFor="price">
        Event Price (Optional)
      </label>
      <input
        id="price"
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        placeholder="e.g. 50 or Free"
      />
    </div>
  );
};

export default PriceInput;
