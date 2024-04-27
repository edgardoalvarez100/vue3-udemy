import express from "express";
import { body } from "express-validator";
import { login, register } from "../controllers/auth.controllers.js";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";

const router = express.Router();

router.post(
  "/login",
  [
    body("email", "No es un email correcto").trim().isEmail().normalizeEmail(),
    body("password", "Minimo 6 caracteres").trim().isLength({ min: 6 }),
  ],
  validationResultExpress,
  login
);
router.post(
  "/register",
  [
    body("email", "No es un email correcto").trim().isEmail().normalizeEmail(),
    body("password", "Minimo 6 caracteres").trim().isLength({ min: 6 }),
    body("password", "Formato de password incorrecto").custom(
      (value, { req }) => {
        console.log(value, req.body.repassword);
        if (value !== req.body.repassword) {
          throw new Error("no coinciden las contraseñas");
        }
        return value;
      }
    ),
  ],
  validationResultExpress,
  register
);

export default router;
