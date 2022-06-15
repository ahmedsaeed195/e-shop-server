const express = require('express')
const multer = require('multer')
const fs = require('fs')
const ImageController = require('../controllers/ImageController')
const ImageValidator = require('../middleware/validation/image/ImageValidator')

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

//#region Swagger Tags
/**
 * @swagger
 *  tags:
 *      name: Image
 *      description: Image managing API
 */
//#endregion

//fetch images
/**
 * @swagger
 *  /image/{name}:
 *      get:
 *          tags: [Image]
 *          summary: Get an image by its name. (used as a normal URL and not an HTTP Get method)
 *          parameters:
 *            - in: path
 *              name: name
 *              schema:
 *                  type: string
 *              description: The image name
 *              required: true
 *          responses:
 *              200:
 *                  description: The image selected
 *              404:
 *                  description: The image was not found
 */
ImageRouter.use('/', express.static('images'))

//#region Upload Image
/**
 * @swagger
 *  /image:
 *      post:
 *          tags: [Image]
 *          summary: Upload an image and link it to a product
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              image:
 *                                  type: string
 *                                  format: binary
 *                                  description: The image file to upload
 *                              id:
 *                                  type: string
 *                              index:
 *                                  type: number
 *          responses:
 *              200:
 *                  description: The image was successfully uploaded
 *              404:
 *                  description: The product was not found
 *              406:
 *                  description: Not Acceptable, data validation error
 *          
 */
//#endregion
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

//#region Delete Image
/**
 * @swagger
 *  /image:
 *      delete:
 *          tags: [Image]
 *          summary: Remove selected image
 *          consumes:
 *              - multipart/form-data
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: string
 *                              index:
 *                                  type: integer
 *          responses:
 *              200:
 *                  description: The image was deleted
 *              404:
 *                  description: The product was not found || The image was not found
 *              406:
 *                  description: Not Acceptable, data validation error
 */
//#endregion
ImageRouter.delete('/', ImageController.delete)

module.exports = ImageRouter