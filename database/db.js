// db.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URL;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Conexión exitosa a MongoDB", MONGODB_URI);
  } catch (error) {
    console.error("Error de conexión a MongoDB:", error);
    process.exit(1); // Salir de la aplicación en caso de error
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  } catch (error) {
    console.error("Error al desconectar de MongoDB:", error);
    process.exit(1); // Salir de la aplicación en caso de error
  }
};
