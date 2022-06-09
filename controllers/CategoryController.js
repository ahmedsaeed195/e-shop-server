const Category = require('../models/Category')
const Product = require('../models/Product')

class CategoryController {
    async index(req, res) {
        const categories = await Category.find().sort('-name')
        return res.status(200).json(categories)
    }

    async indexActive(req, res) {
        const categories = await Category.find({ status: true }).sort('-name')
        return res.status(200).json(categories)
    }

    async store(req, res) {
        try {
            const data = req.body
            const category = await Category.findOne({ name: data.name })
            if (category) {
                return res.status(400).json({
                    message: 'Category already exists'
                })
            }
            const newCategory = await Category.create(data)
            return res.status(201).json({
                message: 'Category Added Successfully',
                category: newCategory
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
            const category = await Category.findOne({ _id: req.params.id })
            if (!category) {
                return res.status(404).json({
                    message: 'Category Not Found!'
                })
            }
            const data = req.body
            const productData = {
                ...(data.name && { category: data.name }),
                status: data.status
            }
            await category.updateOne(data)
            await Product.updateMany({ category: data.name }, productData)
            return res.status(200).json({
                message: "Category Updated Successfully"
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
            const category = await Category.findOne({ _id: req.params.id })
            if (!category) {
                return res.status(404).json({
                    message: 'Category Not Found'
                })
            }
            const products = await Product.find({ category: category.name })
            if (products.length) {
                return res.status(409).json({
                    message: "This Category is used by some products, please remove all products from this category first then try again"
                })
            }
            await category.deleteOne()
            return res.status(200).json({
                message: "Category Deleted Successfully"
            })
        } catch (err) {
            return res.status(500).json({
                message: `Internal Server Error`,
                error: err
            })
        }
    }
}

module.exports = new CategoryController