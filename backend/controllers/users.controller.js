const Users = require("../models/user.model");

exports.addPoint = (req, res) => {
    const {mapPoints} = req.body;
    const user_id = req.user.id;
    if (!mapPoints) {
        res.status(400).json({message: "Points not selected!"});
    }
    Users.findOneAndUpdate({_id: user_id}, {mapPoints}, {new: true}).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(404).json({message: "User not found!"})
    })
}

exports.getPoints = (req, res) => {
    const user_id = req.user.id;
    Users.findById({_id: user_id}).select("mapPoints").then((result)=> {
        res.status(200).json(result);
    }).catch((err)=> {
        res.status(404).json({message: "User not found!"})
    });
}
