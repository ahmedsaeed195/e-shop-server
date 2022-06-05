const Product = require('../models/Product')

class ProductsController {
    async index(req, res) {
        try {
            const searchQuery = req.query
            const products = await Product.find(searchQuery).sort('-createdAt')
            return res.status(200).json(products)
        } catch (err) {
            return res.status(500).json({
                message: `Internal Server Error`,
                error: err
            })
        }
    }

    async show(req, res) {
        try {
            const product = await Product.findOne({ _id: req.params.id })
            if (product) {
                return res.status(200).json(product)
            }
            return res.status(404).json({
                message: 'Not Found'
            })
        } catch (err) {
            return res.status(500).json({
                message: `Internal Server Error`,
                error: err
            })
        }
    }

    async store(req, res) {
        try {
            const data = req.body
            const product = await Product.create(data)
            return res.status(201).json({
                message: 'Product Added',
                product
            })
        } catch (err) {
            return res.status(500).json({
                message: `Internal Server Error`,
                error: err
            })
        }
    }

    async update(req, res) {
        try {
            const product = await Product.findOne({ _id: req.params.id })
            if (!product) {
                return res.status(404).json({
                    message: 'Product Not Found'
                })
            }
            await product.updateOne(req.body)
            return res.status(200).json({
                message: "Product Updated Successfully"
            })
        } catch (err) {
            return res.status(500).json({
                message: `Internal Server Error`,
                error: err
            })
        }

    }

    async delete(req, res) {
        try {
            const product = await Product.findOne({ _id: req.params.id })
            if (!product) {
                return res.status(404).json({
                    message: 'Product Not Found'
                })
            }
            await product.deleteOne()
            return res.status(200).json({
                message: "Product Deleted Successfully"
            })
        } catch (err) {
            return res.status(500).json({
                message: `Internal Server Error`,
                error: err
            })
        }
    }
}

module.exports = new ProductsController