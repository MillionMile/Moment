const mongoose = require('./db')
const { Schema } = mongoose

exports.favorSchema = new Schema({
    folder :{type:Schema.ObjectId , ref: 'Folder'}
})