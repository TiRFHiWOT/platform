import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/utiles/api";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { storage } from "@/utiles/api";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const snapshot = await getDocs(collection(db, "events"));
      const events = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return events;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addEvent = createAsyncThunk(
  "events/addEvent",
  async (event, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, "events"), event);
      return { id: docRef.id, ...event };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editEvent = createAsyncThunk(
  "events/editEvent",
  async ({ id, eventData }, { rejectWithValue }) => {
    try {
      const eventDocRef = doc(db, "events", id);
      await updateDoc(eventDocRef, eventData);
      return { id, ...eventData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (id, { rejectWithValue }) => {
    try {
      const eventDocRef = doc(db, "events", id);
      await deleteDoc(eventDocRef);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadImageToStorage = async (file) => {
  const storageRef = ref(storage, `events/${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};

const initialState = {
  events: [],
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.loading = false;
      state.events = action.payload;
    });
    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(addEvent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.events.push(action.payload);
    });
    builder.addCase(addEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editEvent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editEvent.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.events.findIndex(
        (event) => event.id === action.payload.id
      );
      if (index !== -1) {
        state.events[index] = action.payload; // Update the event in the state
      }
    });
    builder.addCase(editEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteEvent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      ); // Remove the deleted event from the state
    });
    builder.addCase(deleteEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default eventSlice.reducer;
