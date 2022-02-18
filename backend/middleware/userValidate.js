import userModel from "../models/users.js";
// funcion para validar que el usuario no exista en la base de datos
const existingUser = async (req, res, next) => {
  if (!req.body.email)
    return res.status(400).send({ message: "Incomplete data" });

  // consultamos si el usuario ya existe en la base de datos
  const existingEmail = await userModel.findOne({ email: req.body.email });
  // si el usuario existe le mostramos un mensaje de error
  if (existingEmail)
    return res.status(400).send({ message: "The user is already registered" });

  next();
};

const existingUser2 = async (req, res, next) => {
  if (!req.body.user)
    return res.status(400).send({ message: "Incomplete data" });

  // consultamos si el usuario ya existe en la base de datos
  const existingEmail = await userModel.findOne({ email: req.body.user });
  // si el usuario existe le mostramos un mensaje de error
  if (!existingEmail)
    return res
      .status(400)
      .send({ message: "The user is not already registered" });

  req.body.user = existingEmail._id;
  next();
};

export default { existingUser, existingUser2 };
