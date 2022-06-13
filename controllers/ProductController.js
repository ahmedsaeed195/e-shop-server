const path = require('path')
const fs = require('fs')
const Product = require('../models/Product')
const Category = require('../models/Category')

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

    async indexActive(req, res) {
        try {
            const search = {
                status: true,
                ...req.query
            }
            console.log(search)
            const products = await Product.find(search).sort('-createdAt')
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
                message: 'Product Not Found'
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
            const category = await Category.findOne({ name: data.category })
            if (!category) {
                return res.status(400).json({
                    message: "Category Doesn't Exist"
                })
            }
            if (!category.status) {
                data.status = false
            }
            const product = await Product.create(data)
            return res.status(201).json({
                message: 'Product Added Successfully',
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
            const data = req.body
            const category = await Category.findOne({ name: data.category })
            if (!category) {
                return res.status(404).json({
                    message: 'Category Not Found'
                })
            }
            data.status = category.status
            await product.updateOne(data)
            return res.status(200).json({
                message: 'Product Updated Successfully'
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Internal Server Error',
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
            product.images.map(async image => {
                try {
                    if (image) {
                        const file = path.normalize('./images/' + path.basename(image))
                        await fs.promises.unlink(file)
                    }
                } catch (err) {
                    console.error(err)
                }
            })
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