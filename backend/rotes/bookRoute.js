import express from "express";
import bookController from "../controller/bookController.js";
import bookValidate from "../middleware/bookValidate.js";
// import roleValidate from "../middleware/roleValidate.js";

// traemos la funcion de router de express para administrar las rutas o apis
const router = express.Router();

// http://localhost:3001/api/user/registerUser aca asignamos la ruta de la api
// aca colocamos validaciones necesarias para registrar el usuario y estas se hacen por medio del middleware
router.post(
  "/registerBook",
  bookValidate.existingBook,
  bookController.registerBook
);
// aca le decimo que en la url puede o no venir un parametro y que si viene que lo use en el listUser
router.get("/listBook/:name?", bookController.listBook);

export default router;
