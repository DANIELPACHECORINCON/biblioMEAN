import userModel from "../models/users.js";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";
import moment from "moment";

const registerUser = async (req, res) => {
  if (!req.body.name || !req.body.phoneNumber || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  const pashash = await bcrypt.hash(req.body.password, 10);

  const schemaUser = new userModel({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: pashash,
    role: req.body.role,
    dbStatus: true,
  });

  let result = await schemaUser.save();

  if (!result)
    return res.status(500).send({ message: "Failed to register data" });

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: result._id,
          name: result.name,
          roleID: result.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Register error" });
  }
};

const listUser = async (req, res) => {
  let users = await userModel
    .find({ name: new RegExp(req.params["name"]) })
    .populate("role")
    .exec();
  if (users.lenght === 0)
    return res.status(400).send({ message: "no search result" });

  return res.status(200).send({ users });
};

const login = async (req, res) => {
  const userLogin = await userModel.findOne({ email: req.body.email });
  if (!userLogin)
    return res.status(400).send({ message: "wrong email or password" });

  if (!userLogin.dbStatus)
    return res.status(500).send({ message: "user no found" });

  const passHash = await bcrypt.compare(req.body.password, userLogin.password);

  if (!passHash)
    return res.status(400).send({ message: "wrong email or password" });

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: userLogin._id,
          name: userLogin.name,
          roleID: userLogin.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(500).send({ message: "Login error" });
  }
};

const deleteUser = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ message: "Imcomplete data" });

  const users = await userModel.findByIdAndUpdate(req.params["_id"], {
    dbStatus: "false",
  });

  return !users
    ? res.status(500).send({ message: "Error deleting user" })
    : res.status(200).send({ message: "User deleted" });
};

const updateUserAdmin = async (req, res) => {
  if (
    (!req.body._id ||
      !req.body.name ||
      !req.body.role ||
      !req.body.email ||
      !req.body.phoneNumber)
  )
    return res.status(400).send({ message: "Incomplete data." });

  let pass = "";

  if (!req.body.password) {
    const findUser = await userModel.findOne({ email: req.body.email });0

    pass = findUser.password;
  } else {
    pass = await bcrypt.hash(req.body.password, 10);
  }

  const users = await userModel.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    password: pass,
    role: req.body.role,
  });

  if (!users) return res.status(500).send({ message: "Error updating user" });
  return res.status(200).send({ message: "User updated" });
};

export default { registerUser, listUser, login, deleteUser, updateUserAdmin };
