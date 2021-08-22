import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    data: {
      type: String,
      trim: true,
      required: "Must have message body",
    },
    senderID: {
      type: Number,
      required: true,
    },
    channel: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Message ||
  mongoose.model("Message", messageSchema);
