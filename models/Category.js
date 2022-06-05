const mongoose = require('../config/database')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: String,
    status: Boolean,
},
    { timestamps: true }
)

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category