const express = require('express');
const router = express.Router();
const User = require('../models/user')
const wrapAsync = require('../utils/catchAsync')
const validate = require('../utils/validateSchema')
const { userSchema } = require('../joiSchemas')

router.get('/register', (req, res) => {
    res.render('users/register');
})

router.post('/register', validate(userSchema), wrapAsync(async (req, res, next) => {
    res.send(req.body)
}))

module.exports = router;

/*
const user = new User({ email: req.body.email, username: req.body.username })
const newUser = await User.register(user, req.body.password);
await newUser.save();
req.flash('success', 'Successfully registered!');
res.redirect(`/campgrounds`);
*/