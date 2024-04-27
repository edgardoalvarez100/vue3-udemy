import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    //jwt token
    return res.status(201).json({ ok: true });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Ya existe el correo registrado" });
    } else {
      return res.status(400).json({ error: "Ocurrio un error guardando" });
    }
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(403).json({ error: "Usuario no existe" });

    const respuestaPassword = user.comparePassword(password);
    if (!respuestaPassword) {
      return res.status(403).json({ error: "Contraseña incorrecta" });
    }
    //generar jwt token
    const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET);

    return res.json({ ok: true, token });
  } catch (error) {
    console.log(error);
  }
};
