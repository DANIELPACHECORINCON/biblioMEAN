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

export default { registerLending, listLending };
