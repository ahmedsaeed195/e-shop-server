const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = Joi.object({
    id: Joi.objectId()
})

const validate = async (req, res, next) => {
    try {
        await schema.validateAsync(req.params.id)
        next();
    } catch (err) {
        return res.status(406).json({
            message: 'Data Validation Error',
            error: err
        })
    }
}

module.exports = validate