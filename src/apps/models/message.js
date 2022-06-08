const mongoose = require("../../common/database")();

const MessageSchema = new mongoose.Schema({
    body:{
        type: String,
        default: null,
    },
    room_id:{
        type: mongoose.Types.ObjectId,
        ref:"Room"
    },
    author_id:{
        type: mongoose.Types.ObjectId,
        ref:"User"
    }
}, {
    timestamps: true,
});

const MessageModel = mongoose.model("Message", MessageSchema, "messages");
module.exports = MessageModel;