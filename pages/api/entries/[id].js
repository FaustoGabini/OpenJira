import { connectDB, disconnectDB } from "@/database/db";
import { Entry } from "@/models";
import mongoose from "mongoose";

export default function handler(req, res) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ message: "El id no es valido" + id });
  }

  switch (req.method) {
    case "GET":
      return getEntry(req, res);

    case "PUT":
      return updateEntry(req, res);

    default:
      return res.status(400).json({
        message: "Endpoint No existe",
      });
  }
}

const getEntry = async (req, res) => {
  const { id } = req.query;
  await connectDB();
  const entry = await Entry.findById(id);
  if (!entry) {
    return res.status(400).json({
      message: "No hay entrada con ese ID: " + id,
    });
  }

  await disconnectDB();
  return res.status(200).json(entry);
};

const updateEntry = async (req, res) => {
  const { id } = req.query;
  await connectDB();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    return res.status(400).json({
      message: "No hay entrada con ese ID: " + id,
    });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updateEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    );

    await disconnectDB();
    res.status(200).json(updateEntry);
  } catch (error) {
    await disconnectDB();
    res.status(400).json({ message: error.errors.status.message });
  }
};
