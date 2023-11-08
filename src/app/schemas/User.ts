import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const { Schema } = mongoose;

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    roles: [String],
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

console.log("User schema created", mongoose.models.User);

export const User =  mongoose.model("User", schema);
