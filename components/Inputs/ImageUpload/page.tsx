import { ClipLoader } from "react-spinners";

const ImageUpload = ({
  useUrl,
  setUseUrl,
  image,
  setImage,
  handleFileChange,
  loadingImage,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 font-semibold mb-2">
        Add Event Image
      </label>
      <div className="flex items-center mb-4">
        <button
          type="button"
          onClick={() => setUseUrl(false)}
          className={`px-4 py-2 rounded-s-md ${
            !useUrl ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
          }`}
        >
          Upload File
        </button>
        <button
          type="button"
          onClick={() => setUseUrl(true)}
          className={`px-4 py-2 mr-2 rounded-e-md ${
            useUrl ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
          }`}
        >
          Use URL
        </button>
      </div>

      {useUrl ? (
        <input
          id="image"
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      ) : (
        <div>
          <input
            id="imageFile"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {loadingImage && (
            <div className="flex justify-center mt-2">
              <ClipLoader color="#4A90E2" loading={loadingImage} size={50} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
