import { Router } from "express";
import { body } from "express-validator";
import { infoUser, login, register } from "../controllers/auth.controllers.js";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = Router();

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

router.get("/protected", requireToken, infoUser);

export default router;
