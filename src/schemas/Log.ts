import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const { Schema } = mongoose;

const schema = new Schema(
  {
    method: { type: String, required: true },
    message: { type: String, required: true  },
    type: { type: String, default: "error" },
    payload: { type: Schema.Types.Mixed },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    usePushEach: true,
  }
);

schema.plugin(autopopulate);

const Log =  mongoose.models.Log || mongoose.model("Log", schema);
export default Log;
