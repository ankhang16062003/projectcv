const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            unique: true,
            required: true,
        },
        imgPost: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        user: {
            type: String,
            required: true,
        },
        categories: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Post', PostSchema)