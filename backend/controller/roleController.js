import roleModel from "../models/roles.js";

const registerRole = async (req, res) => {
    if(!req.body.name || !req.body.description) return res.status(400).send({message:"Incomplete data"});

    let schemaRole = new roleModel({
        name: req.body.name,
        description: req.body.description,
        dbStatus: true
    })

    let result = await schemaRole.save();
    if(!result) return res.status(500).send({message: "failed to register data"});

    return res.status(200).send({result});
}

const listRole = async (req, res) => {
    let roles = await roleModel.find();
    if(roles.lenght === 0) return res.status(400).send({message:"no search results"});

    return res.status(200).send({roles});
}

export default {registerRole, listRole};
