const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = Joi.object({
    id: Joi.objectId().required(),
    index: Joi.number().integer().min(0).max(4).required()
}).options({ stripUnknown: true })

const validate = async (req, res, next) => {
    try {
        const data = req.body
        if (data.index) {
            data.index = parseInt(data.index)
        }
        await schema.validateAsync(data)
        req.body = data
        next();
    } catch (err) {
        return res.status(406).json({
            message: 'Data Validation Error',
            error: err
        })
    }
}

module.exports = validate