import mongoose from "mongoose";

const FormModelSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  serviceTypes: {
    type: String,
    enum: ["Mobile application", "Web site", "Controlling system"],
  },
  organizationType: {
    type: String,
    enum: [
      "Бизнесийн байгууллага / ХХК",
      "Төрийн байгууллага",
      "Төрийн бус байгууллага / ТББ",
      "Бизнесийн байгууллага (Олон нийтийн) / ХК",
      "Хувь хүн",
      "Гарааны бизнес",
      "Бусад",
    ],
  },
});

// Export the model or use an existing one
export default mongoose.models.FormModel || mongoose.model("FormModel", FormModelSchema);
