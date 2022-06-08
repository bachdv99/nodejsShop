const mongoose = require("../../common/database")();

const commentSchema = new mongoose.Schema({
        prd_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        full_name: {
            type: String,
            default: null,
        },
        email: {
            type: String,
            default: null,
        },
        body: {
            type: String,
            default: null,
        }
    },
    {
        timestamps: true,
    }
);

const CommentModel = mongoose.model("Comment", commentSchema, "comments");
module.exports = CommentModel;