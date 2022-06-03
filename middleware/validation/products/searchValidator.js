const Joi = require('joi')

const schema = Joi.object({
    name: Joi.string().alphanum().optional(),
    price: Joi.number().optional(),
    quantity: Joi.number().integer().optional(),
    category: Joi.string().alphanum().optional(),
    description: Joi.string().alphanum().optional(),
    rating: Joi.number().integer().optional()
}).options({ stripUnknown: true })

const validate = async (req, res, next) => {
    try {
        const queryData = req.query
        if (queryData.price) {
            queryData.price = parseInt(queryData.price)
        }
        if (queryData.quantity) {
            queryData.quantity = parseInt(queryData.quantity)
        }
        if (queryData.rating) {
            queryData.rating = parseInt(queryData.rating)
        }
        const value = await schema.validateAsync(queryData)
        if (value) {
            for (const query in value) {
                if (typeof (value[query]) === 'string') {
                    value[query] = { $regex: '.*' + value[query] + '.*' }
                }
            }
        }
        req.query = value
        next();
    } catch (err) {
        return res.status(406).json({
            message: 'Data Validation Error',
            error: err
        })
    }
}

module.exports = validate