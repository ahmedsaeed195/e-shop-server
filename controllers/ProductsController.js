const Product = require('../models/Product')

class ProductsController {
    async index(req, res) {
        const products = await Product.find()
        return res.status(200).json(products)
    }

    async show(req, res) {
        const product = await Product.findOne({ _id: req.params.id })
        if (product) {
            return res.status(200).json(product)
        }
        return res.status(404).json({
            message: 'Not Found'
        })
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
            return res.status(400).json({
                message: `Invalid Request`,
                error: err
            })
        }
    }

    async update(req, res) {
        const product = await Product.findOne({ _id: req.params.id })
        if (!product) {
            return res.status(404).json({
                message: 'Product Not Found'
            })
        }
        try {
            const data = req.body
            const query = await product.updateOne(data)
            if (query.acknowledged) {
                return res.status(200).json({
                    message: "Product Updated Successfully"
                })
            }
            return res.status(400).json({
                message: 'something went wrong'
            })
        } catch (err) {
            return res.status(400).json({
                message: `Invalid Request`,
                error: err
            })
        }

    }

    async updateStatus(req, res) {
        const product = await Product.findOne({ _id: req.params.id })
        if (!product) {
            return res.status(404).json({
                message: 'Product Not Found'
            })
        }
        try {
            const data = req.body
            const query = await product.updateOne(data)
            if (query.acknowledged) {
                return res.status(200).json({
                    message: "Product Status Updated Successfully"
                })
            }
            return res.status(400).json({
                message: 'something went wrong'
            })
        } catch (err) {
            return res.status(400).json({
                message: `Invalid Request`,
                error: err
            })
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id
            const query = await Product.deleteOne({ _id: id })
            if (query.acknowledged) {
                return res.status(200).json({
                    message: "Product Deleted Successfully"
                })
            }
            return res.status(400).json({
                message: 'something went wrong'
            })
        } catch (err) {
            return res.status(400).json({
                message: `Invalid Request`,
                error: err
            })
        }
    }
}

module.exports = new ProductsController