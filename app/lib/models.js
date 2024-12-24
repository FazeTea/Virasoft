// models/SomeModel.js
import mongoose from "mongoose";

const ProjectModel = new mongoose.Schema({
  title: String,
  link: String,
  thumbnail: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
  Highlight: {
    type: Boolean,
    default: false,
  },
  Category: {
    type: String,
    enum: ["Web", "App", "System"],
  },
});

export default mongoose.models.ProjectModel || mongoose.model("ProjectModel", ProjectModel);
