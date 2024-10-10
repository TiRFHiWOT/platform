import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEvent, editEvent } from "@/redux/eventSlice";
import { useRouter } from "next/router";
import { uploadImageToStorage } from "@/redux/eventSlice";
import TitleInput from "../Inputs/TitleInput/page";
import DateTimeInput from "../Inputs/DateTimeInput/page";
import LocationInput from "../Inputs/LocationInput/page";
import DescriptionInput from "../Inputs/DescriptionInput/page";
import PriceInput from "../Inputs/PriceInput/page";
import ImageUpload from "../Inputs/ImageUpload/page";
import SubmitButton from "../Inputs/SubmitButton/page";
import CategoryInput from "../Inputs/CategoryInput/page";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utiles/api";

const AddEventPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.events);
  const { id } = router.query;

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [useUrl, setUseUrl] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchEventData = async () => {
        const docRef = doc(db, "events", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const eventData = docSnap.data();
          setTitle(eventData.title);
          setDate(eventData.date);
          setTime(eventData.time);
          setLocation(eventData.location);
          setCategory(eventData.category);
          setDescription(eventData.description);
          setPrice(eventData.price);
          setImage(eventData.image);
        } else {
          console.error("No such document!");
        }
      };
      fetchEventData();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = image;

    if (!useUrl && imageFile) {
      try {
        setLoadingImage(true);
        imageUrl = await uploadImageToStorage(imageFile);
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        setLoadingImage(false);
        return;
      } finally {
        setLoadingImage(false);
      }
    }

    const newEvent = {
      title,
      date,
      time,
      location,
      category,
      description,
      price: price || "Free",
      image: imageUrl,
    };

    console.log("Submitting Event:", newEvent);

    const result = id
      ? await dispatch(editEvent({ id, eventData: newEvent }))
      : await dispatch(addEvent(newEvent));

    console.log("Dispatch Result:", result);

    if (result.error) {
      console.error("Failed to save event:", result.error.message);
    } else {
      router.push("/events");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const categoriesList = ["Music", "Sports", "Conference", "Workshop"];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6 text-gray-100">
        {id ? "Edit Event" : "Add Event"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-gray-100 border border-gray-200 text-gray-800 p-8 shadow-md rounded-lg"
      >
        <TitleInput title={title} setTitle={setTitle} />
        <DateTimeInput
          date={date}
          setDate={setDate}
          time={time}
          setTime={setTime}
        />
        <LocationInput location={location} setLocation={setLocation} />
        <CategoryInput
          category={category}
          setCategory={setCategory}
          categories={categoriesList}
        />
        <DescriptionInput
          description={description}
          setDescription={setDescription}
        />
        <PriceInput price={price} setPrice={setPrice} />
        <ImageUpload
          useUrl={useUrl}
          setUseUrl={setUseUrl}
          image={image}
          setImage={setImage}
          handleFileChange={handleFileChange}
          loadingImage={loadingImage}
        />
        <SubmitButton loading={loading} loadingImage={loadingImage} />
      </form>
    </div>
  );
};

export default AddEventPage;
