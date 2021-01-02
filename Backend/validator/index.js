const {check, validationResult} = require('express-validator');

exports.userSignupValidator =[
    check('name').not().isEmpty().isLength({min: 5}).withMessage('Name must have more than 5 characters'),
    check('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
    check('password', 'Your password must be at least 5 characters').not().isEmpty().isLength({min: 5}),
];
exports.userErrorSend = (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        const firstError = errors.errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
}