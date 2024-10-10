const SubmitButton = ({ loading, loadingImage }) => {
  return (
    <button
      type="submit"
      className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
      disabled={loading || loadingImage}
    >
      {loading || loadingImage ? "Adding Event..." : "Add Event"}
    </button>
  );
};

export default SubmitButton;
