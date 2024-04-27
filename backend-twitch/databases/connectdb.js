import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.MONGODB_CN);
  console.log("connect DB OK ❤️");
} catch (error) {
  console.log("Error de conexion a mongo : " + error);
}
