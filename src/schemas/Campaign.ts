import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const { Schema } = mongoose;

const schema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    start_date: {
      type: String,
      default: Date.now,
    },
    end_date: Date,
    status: {
      type: String,
      default: "active",
    },
    master: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    characters: [
      {
        type: Schema.Types.ObjectId,
        ref: "Character",
      },
    ],
  },
  { timestamps: true }
);

schema.plugin(autopopulate);

export const Campaign =
  mongoose.models.Campaign || mongoose.model("Campaign", schema);
