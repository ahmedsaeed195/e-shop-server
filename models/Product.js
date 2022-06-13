const mongoose = require('../config/database')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: String,
    price: Number,
    quantity: {
        type: Number,
        integer: true
    },
    category: String,
    description: String,
    rating: {
        type: Number,
        integer: true
    },
    status: {
        type: Boolean,
        default: true
    },
    images: [String]
},
    { timestamps: true }
)

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product