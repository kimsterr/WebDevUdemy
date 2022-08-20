const ExpressError = require('../ExpressError')

function validate(schema) {
    return (req, res, next) => {
        const err = schema.validate(req.body).error
        if (err) {
            const errMsg = err.details.map(el => el.message).join(',');
            next(new ExpressError(errMsg, 400));
        }
        else {
            next();
        }
    }
}

module.exports = validate;