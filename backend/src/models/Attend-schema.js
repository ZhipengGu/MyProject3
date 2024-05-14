import mongoose, { Schema } from "mongoose";
const attendSchema = new Schema(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Attend = mongoose.model("Attend", attendSchema);
export default Attend;