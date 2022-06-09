const Joi = require('joi')

const schema = Joi.object({
    name: Joi.string().required(),
    status: Joi.boolean().default(true)
}).options({ stripUnknown: true })

const validate = async (req, res, next) => {
    try {
        const value = await schema.validateAsync(req.body)
        req.body = value
        next();
    } catch (err) {
        return res.status(406).json({
            message: 'Data Validation Error',
            error: err
        })
    }
}

module.exports = validate