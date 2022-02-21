import lendingModel from "../models/lending.js";

const registerLending = async (req, res) => {
  if (!req.body.user || !req.body.book)
    return res.status(400).send({ message: "Incomplete data" });

    

  const schemaLending = new lendingModel({
    user: req.body.user,
    book: req.body.book,
    devolutionDate: req.body.devolutionDate,
    lendingStatus: "activo",
  });

  let result = await schemaLending.save();

  if (!result)
    return res.status(500).send({ message: "Failed to register data" });

  return res.status(200).send({ result });
};

const listLending = async (req, res) => {
  let lending = await lendingModel.find().populate("user").populate("book").exec();

  if (lending.lenght === 0)
    return res.status(400).send({ message: "no search result" });

  return res.status(200).send({ lending });
};

// const deleteLending = async (req, res) => {
//   if (!req.params["_id"])
//     return res.status(400).send({ message: "Imcomplete data" });

//   const users = await userModel.findByIdAndUpdate(req.params["_id"], {
//     dbStatus: "false",
//   });

//   return !users
//     ? res.status(500).send({ message: "Error deleting user" })
//     : res.status(200).send({ message: "User deleted" });
// };

const updateLending = async (req, res) => {
  if (!req.body._id ||
      !req.body.user ||
      !req.body.book ||
      !req.body.devolutionDate ||
      !req.body.lendingStatus
  )
    return res.status(400).send({ message: "Incomplete data." });

  const lending = await userModel.findByIdAndUpdate(req.body._id, {
    user: req.body.user,
    book: req.body.book,
    devolutionDate: req.body.devolutionDate,
    lendingStatus: req.body.lendingStatus,
  });

  if (!lending) return res.status(500).send({ message: "Error updating lending" });
  return res.status(200).send({ message: "Lending updated" });
};


export default { registerLending, listLending, updateLending };
