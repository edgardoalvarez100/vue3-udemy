import jwt from "jsonwebtoken";

export const requireToken = (req, res, next) => {
  try {
    const { headers } = req;
    let token = headers.authorization;
    if (!token) throw new Error("no autorizado, no existe el token");
    token = token.split(" ")[1];
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ error: error.message });
  }
};
