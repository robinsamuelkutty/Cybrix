import mongoose from "mongoose";

const dressSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      // Removed enum since the frontend uses a text input instead of predefined options
    },
    material: {
      type: String,
      required: true,
    },
    colour: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Dress = mongoose.models.Dress || mongoose.model("Dress", dressSchema);

export default Dress;