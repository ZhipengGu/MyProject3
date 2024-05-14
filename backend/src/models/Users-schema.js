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

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      minlength: 2,
      maxlength: 50,
      unique: true,
    },
     displayName: {
      type: String,
      required: [true, "displayName is required"],
      minlength: 2,
      maxlength: 50,
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password length should be greater than 6 characters"],
      select: true,
    },
    
    email: {
      type: String,
      required: [true, " Email is Required!"],
      unique: true,
    },

    avatarPath: {
      type: String,
       required: [true, " Avatar is Required!"]
    },
    tags: [{
        type: String,
        enum: TAGS_ENUM,
    }],
  },
  { timestamps: true }
);

// Middleware to ensure tags always include "Community"
userSchema.pre('save', function(next) {
  if (!this.tags.includes("Community")) {
    this.tags.push("Community");
  }
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
