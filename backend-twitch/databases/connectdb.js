import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.MONGODB_CN);
  console.log("connect DB OK ❤️");
} catch (error) {
  throw new Error("Error de conexion a mongo");
  console.log("Error de conexion a mongo : " + error);
}
