import userModel from "../models/users.js";
import bcrypt from "bcrypt";

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
          _id: userLogin._id,
          name: userLogin.name,
          roleID: userLogin.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
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

export default { registerUser, listUser, login };
