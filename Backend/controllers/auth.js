const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const {errorHandler} = require('../helpers/dbErrorHandler')

exports.signup = (req, res) => {
    
    const user = new User(req.body);
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                err:"Email is taken."
            });
        }
        user.salt=undefined;
        user.hashed_password=undefined;
        res.json({
            user
        });
    });
};


exports.signin = (req, res) => {
    const {email, password} = req.body;
    User.findOne({email}, (err, user) => {
        console.log(err, user)
        if(err || !user){
            return res.status(400).json({
                err: "User with this email not exist"
            });
        }

        if(!user.authenticate(password)){
            return res.status(400).json({
                err: 'Password is not correct'
            });
        }

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

        res.cookie('t', token, {expire: new Date()+9999});

        const {_id, name, email, role} = user;
        return res.json({
            token,
            user : {_id, name,email, role}
        });
    });
}

exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({msg: "Signout successfully"});
}