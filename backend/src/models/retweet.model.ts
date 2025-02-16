import mongoose from "mongoose";

const RetweetSchema = new mongoose.Schema(
  {
    originalPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    retweetedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Retweet = mongoose.model("Retweet", RetweetSchema);
