import { connectDB, disconnectDB } from "@/database/db";
import { Entry } from "@/models";

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getEntries(res);

    case "POST":
      return postEntry(req, res);

    default:
      return res.status(400).json({
        message: "Endpoint No existe",
      });
  }
}

const getEntries = async (res) => {
  await connectDB();
  const entries = await Entry.find().sort({ createdAt: "ascending" });
  await disconnectDB();
  res.status(200).json(entries);
};

const postEntry = async (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({
      message: "La descripción es requerida",
    });
  }

  const newEntry = new Entry({
    description,
    createdAt: Date.now(),
  });

  try {
    await connectDB();
    await newEntry.save();
    await disconnectDB();
    res.status(201).json(newEntry);
  } catch (error) {
    await disconnectDB();
    console.log(error);
    return res
      .status(500)
      .json({ message: "Algo salio mal, revisar consola del servidor" });
  }
};
