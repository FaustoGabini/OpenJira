import { isValidObjectId } from "mongoose";
import { connectDB, disconnectDB } from "./db";
import { Entry } from "@/models";

export const getEntryById = async (id) => {
  if (!isValidObjectId(id)) return null;

  await connectDB();
  const entry = await Entry.findById(id).lean();
  await disconnectDB();

  return JSON.parse(JSON.stringify(entry));
};
