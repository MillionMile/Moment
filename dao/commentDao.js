const mongoose = require('./db')
const { Schema } = mongoose

exports.commentSchema = new Schema({
        content: String
})