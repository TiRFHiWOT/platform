import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from "@/redux/eventSlice";
import { useRouter } from "next/router";
import { uploadImageToStorage } from "@/redux/eventSlice";
import { ClipLoader } from "react-spinners";

const AddEventPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error } = useSelector((state) => state.events);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [useUrl, setUseUrl] = useState(true);
  const [loadingImage, setLoadingImage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = image;
    if (!useUrl && imageFile) {
      try {
        setLoadingImage(true);
        imageUrl = await uploadImageToStorage(imageFile);
        setLoadingImage(false);
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        setLoadingImage(false);
        return;
      }
    }

    const newEvent = {
      title,
      date,
      time,
      location,
      description,
      price: price || "Free",
      image: imageUrl,
    };
    const result = await dispatch(addEvent(newEvent));
    if (result.error) {
      console.error("Failed to add event:", result.error.message);
    } else {
      router.push("/events");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Add New Event</h2>
      {loading && <p>Submitting event...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white text-gray-800 p-8 shadow-md rounded-lg"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="title"
          >
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

        <div className="mb-4 flex flex-row gap-2">
          <div className="w-1/2">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="date"
            >
              Event Date/Time
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="w-1/2">
            <label
              className="block text-gray-700 font-semibold my-8"
              htmlFor="time"
            ></label>
            <input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

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

        {/* New Description Input */}
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

        {/* New Price Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="price"
          >
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

        {/* Toggle between image URL and file upload */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Add Event Image
          </label>
          <div className="flex items-center mb-4">
            <button
              type="button"
              onClick={() => setUseUrl(true)}
              className={`px-4 py-2 mr-2 rounded ${
                useUrl ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              Use URL
            </button>
            <button
              type="button"
              onClick={() => setUseUrl(false)}
              className={`px-4 py-2 rounded ${
                !useUrl ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              Upload File
            </button>
          </div>

          {/* Conditionally render URL or file input */}
          {useUrl ? (
            <input
              id="image"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image URL"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required={useUrl}
            />
          ) : (
            <div>
              <input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required={!useUrl}
              />
              {/* Show loading spinner during image upload */}
              {loadingImage && (
                <div className="flex justify-center mt-2">
                  <ClipLoader
                    color="#4A90E2"
                    loading={loadingImage}
                    size={50}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
          disabled={loading || loadingImage} // Disable submit if image is uploading
        >
          {loading ? "Adding Event..." : "Add Event"}
        </button>
      </form>
    </div>
  );
};

export default AddEventPage;
