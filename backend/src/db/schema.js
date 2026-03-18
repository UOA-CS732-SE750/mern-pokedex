import mongoose from "mongoose";

const Schema = mongoose.Schema;

const speciesSchema = new Schema(
  {
    dexNumber: { type: Number, required: true },
    gen: { type: Number, required: true },
    name: { type: String, required: true },
    normalImage: { type: String, required: false },
    shinyImage: { type: String, required: false },
    dexEntry: { type: String, required: false },
    types: [{ type: String, required: false, enum: VALID_TYPES }],
    crySound: { type: String, required: false }
  },
  {
    strict: true
  }
);

export const Species = mongoose.model("Species", speciesSchema);
