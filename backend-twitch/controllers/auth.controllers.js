import { User } from "../models/User.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    //jwt token
    return res.json({ ok: true });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Ya existe el correo registrado" });
    } else {
      return res.status(400).json({ error: "Ocurrio un error guardando" });
    }
  }
};

export const login = async (req, res) => {
  res.json({ ok: true });
};
