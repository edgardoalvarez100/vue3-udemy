import jwt from "jsonwebtoken";

export const generateToken = (uid) => {
  try {
    const expiresIn = 60 * 15;
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, {
      expiresIn,
    });
    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};
