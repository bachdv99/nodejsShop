const UserModel = require("../models/user");
const RoomModel = require("../models/rooms");
module.exports.chat = async (req, res)=>{
    const userID = req.session._id;
    console.log(userID);
    const users = await UserModel.find({
        _id: {$nin: [userID]}
    });
    console.log(users);

    const rooms = await RoomModel
        .find({
            users: {$all: [userID]}
        })
        .populate({path: "users"});
        console.log(rooms)
    res.render("chat", {users, rooms});
}