import mongoose, { Model, Schema } from "mongoose";

const entrySchema = new Schema({
  description: { type: String, required: true },
  createdAt: { type: Number },
  status: {
    type: String,
    enum: {
      values: ["pending", "in-progress", "finished"],
      message: "{VALUE} no es un estado válido",
    },
    default: "pending",
  },
});

const EntryModel =
  mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default EntryModel;
