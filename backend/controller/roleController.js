import roleModel from "../models/roles.js";

const registerRole = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send({ message: "Incomplete data" });

  let schemaRole = new roleModel({
    name: req.body.name,
    description: req.body.description,
    dbStatus: true,
  });

  let result = await schemaRole.save();
  if (!result)
    return res.status(500).send({ message: "failed to register data" });

  return res.status(200).send({ result });
};

const listRole = async (req, res) => {
  let roles = await roleModel.find();
  if (roles.lenght === 0)
    return res.status(400).send({ message: "no search results" });

  return res.status(200).send({ roles });
};

const deleteRole = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ message: "Imcomplete data" });

  const roles = await roleModel.findByIdAndUpdate(req.params["_id"], {
    dbStatus: "false",
  });

  return !roles
    ? res.status(500).send({ message: "Error deleting role" })
    : res.status(200).send({ message: "Role deleted" });
};

const updateRoleAdmin = async (req, res) => {
    if (!req.body._id ||
        !req.body.name ||
        !req.body.description
    )
      return res.status(400).send({ message: "Incomplete data." });
    
    const roles = await roleModel.findByIdAndUpdate(req.body._id, {
      name: req.body.name,
      description: req.body.description
    });
  
    if (!roles) return res.status(500).send({ message: "Error updating role" });
    return res.status(200).send({ message: "Role updated" });
  };

export default { registerRole, listRole, deleteRole, updateRoleAdmin };
