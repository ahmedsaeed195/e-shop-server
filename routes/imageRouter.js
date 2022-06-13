const express = require('express')
const multer = require('multer')
const fs = require('fs')
const ImageController = require('../controllers/ImageController')
const ImageValidator = require('../middleware/validation/image/ImageValidator')
const { nextTick } = require('process')

const ImageRouter = express.Router()

const storage = multer.diskStorage({
    destination: function (req, files, cb) {
        const dir = 'images/'
        if (!fs.existsSync(dir)) {
            return fs.mkdir(dir, err => cb(err, dir))
        }
        return cb(null, dir)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
        return cb(null, true)
    return cb(new Error('invalide mime type'), false)
}

const uploads = multer({ storage, fileFilter }).single('image')

//fetch images
ImageRouter.use('/', express.static('images'))

//upload images
ImageRouter.post('/', function (req, res, next) {
    uploads(req, res, function (err) {
        if (err) {
            return res.status(406).json({
                message: 'invalide mime type',
                error: err
            })
        }
        next()
        // Everything went fine.
    })
}, ImageValidator, ImageController.upload)

ImageRouter.delete('/', ImageController.delete)

module.exports = ImageRouter