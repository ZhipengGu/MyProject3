import mongoose, { Schema } from "mongoose";

const TAGS_ENUM = [
  "Arts & Culture",
  "Sports & Recreation",
  "Music & Concerts",
  "Food & Drink",
  "Health & Wellness",
  "Business & Networking",
  "Family & Education",
  "Technology & Innovation",
  "Fashion & Beauty",
  "Charity & Fundraising",
  "Community"
];

const eventSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      min: 5,
      max: 50,
    },
    description: {
      type: String,
      required: true,
      min: 10,
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    vacancy: { type: Number, required: true },
    address: {
        detailed_address: { type: String, required: true },
        location:{
            type: { type: String, default: "Point"},
            coordinates: { type: [Number], required: true , index:"2dsphere"}
        }
    },
    imageUrl: String,
    tags: [{
      type: String,
      enum: TAGS_ENUM,
    }],
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;