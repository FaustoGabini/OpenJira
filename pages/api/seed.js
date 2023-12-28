import { connectDB, disconnectDB } from "@/database/db";
import { seedData } from "@/database/seed-data";
import { Entry } from "@/models";

export default async function handler(req, res) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({
      message: "No tiene acceso a este servicio",
    });
  }

  await connectDB();
  await Entry.deleteMany();
  await Entry.insertMany(seedData.entries);
  await disconnectDB();

  res.status(200).json({
    message: "Proceso realizado correctamente",
  });
}
