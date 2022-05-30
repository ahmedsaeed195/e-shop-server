const mongoose = require('../config/database')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const ProductSchema = new Schema({
    name: String,
    price: Number,
    quantity: {
        type: Number,
        integer: true
    },
    categoryId: ObjectId,
    description: String,
    rating: {
        type: Number,
        integer: true
    }
},
    { timestamps: true }
)

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product