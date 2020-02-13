const mongoose = require("mongoose");
const { Schema } = mongoose;

const requireNumber = {
  type: Number,
  required: true
};

const blogSchema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    comments: String,
    image: String,
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0
    },
    latitude: {
      ...requireNumber,
      min: -90,
      max: 90
    },
    longitude: {
      ...requireNumber,
      min: -180,
      max: 180
    },
    visitDate: {
      required: true,
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const logEntry = mongoose.model("LogEntry", blogSchema);

module.exports = logEntry;
