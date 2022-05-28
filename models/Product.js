const mongoose = require('../config/database')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: String,
    price: Number,
    stock: Number,
    status: Boolean,
},
    { timestamps: true }
)

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product