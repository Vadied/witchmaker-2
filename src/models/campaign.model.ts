import mongoose from "mongoose";

const { Schema } = mongoose;

const campaignSchema = new Schema(
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
  },
  { timestamps: true }
);

export type TCampaign = {
  name: string;
  slug: string;
  description: string;
  id: string;
};

export const Campaign =
  mongoose.models.Campaign || mongoose.model("Campaign", campaignSchema);

// export type Campaign = {
//   id: string;
//   slug: string;
//   name: string;
//   description: string;
//   start_date: string;
//   end_date: string;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
//   master: string;
// };
