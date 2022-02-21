import express from "express";
import lendingController from "../controller/lendingController.js";
import userValidate from "../middleware/userValidate.js";
import bookValidate from "../middleware/bookValidate.js";

// traemos la funcion de router de express para administrar las rutas o apis
const router = express.Router();

// http://localhost:3001/api/user/registerUser aca asignamos la ruta de la api
// aca colocamos validaciones necesarias para registrar el usuario y estas se hacen por medio del middleware
router.post(
  "/registerLending",
  userValidate.existingUser2,
  bookValidate.existingBook2,
  lendingController.registerLending
);
// aca le decimo que en la url puede o no venir un parametro y que si viene que lo use en el listUser
router.get("/listLending", lendingController.listLending);
router.put("/updateLending", lendingController.updateLending);

export default router;
