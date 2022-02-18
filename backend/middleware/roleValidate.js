import roleModel from "../models/roles.js";

// funcion para buscar el role que le vamos asignar al usuario
const exixtingRole = async (req, res, next) => {
  // consultamos el role en la base de datos y por defecto definimos que el role sea user
  const roleID = await roleModel.findOne({ name: "user" });
  if (!roleID) return res.status(500).send({ message: "No role was assigned" });
  // asignamos el id del role consultado al body del req
  req.body.role = roleID._id;
  // con next() le decimos que siga el flujo de proceso
  next();
};

const exixtingRole2 = async (req, res, next) => {
  // consultamos el role en la base de datos y por defecto definimos que el role sea user
  const roleID = await roleModel.findOne({ name: "user" });
  if (roleID)
    return res.status(500).send({ message: "The role is already registered" });
  // con next() le decimos que siga el flujo de proceso
  next();
};

export default { exixtingRole, exixtingRole2 };
