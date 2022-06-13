const Product = require('../models/Product')
const path = require('path')
const fs = require('fs')

class ImageController {
    async upload(req, res) {
        try {
            const data = req.body
            const product = await Product.findOne({ _id: data.id })
            if (!product) {
                return res.status(404).json({
                    message: 'Product Not Found'
                })
            }
            if (product.images[data.index]) {
                const file = path.normalize('./images/' + path.basename(product.images[data.index] ? product.images[data.index] : 'null'))
                await fs.promises.unlink(file)
            }
            product.images[data.index] = path.basename(req.file.path)
            await product.save()
            res.status(200).json({
                message: 'image uploaded successfully',
                file: req.file
            })
        } catch (err) {
            //delete the recent uploaded file in case of error to free up consumed space
            const file = path.normalize('./images/' + path.basename(req.file.path))
            await fs.promises.unlink(file)
            return res.status(500).json({
                message: `Internal Server Error`,
                error: err
            })
        }
    }

    async delete(req, res) {
        try {
            const data = req.body
            const product = await Product.findOne({ _id: data.id })
            if (!product) {
                return res.status(404).json({
                    message: 'Product Not Found'
                })
            }
            if (!product.images[data.index]) {
                return res.status(406).json({
                    message: 'No Image Provided',
                    error: `Value of image of index ${data.index} is null`
                })
            }
            const file = path.normalize('./images/' + path.basename(product.images[data.index]))
            await fs.promises.unlink(file)
            product.images[data.index] = null
            await product.save()
            res.status(200).json({
                message: 'Image Deleted Successfully',
                product
            })
        } catch (err) {
            if (err.code === 'ENOENT') {
                //empty the image location in product because the used image doesn't exist
                const product = await Product.findOne({ _id: req.body.id })
                product.images[req.body.index] = null
                await product.save()
                return res.status(404).json({
                    message: `Image Not Found`,
                    error: err
                })
            }
            return res.status(500).json({
                message: `Internal Server Error`,
                error: err
            })
        }
    }
}

module.exports = new ImageController