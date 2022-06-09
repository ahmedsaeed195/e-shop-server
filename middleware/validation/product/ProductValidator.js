const Joi = require('joi')

const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().integer().required(),
    category: Joi.string().required(),
    description: Joi.string().empty('').default('No Description'),
    rating: Joi.number().integer().min(0).max(5).default(0)
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