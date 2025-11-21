// backend/models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  place: String,
  guests: Number,
  price: Number,
  type: String,
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
