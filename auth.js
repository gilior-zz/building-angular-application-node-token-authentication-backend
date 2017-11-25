var User = require('./models/users.js')
var bcrypt = require('bcrypt-nodejs')
var jwt = require('jwt-simple');
var express = require('express')

var router = express.Router();

router.post('/register', (req, res) => {
    var user = new User(req.body)
    user.save((err, res) => {
        if (err)
            console.log('err on save user')
    })
    res.sendStatus(200)
})
router.post('/login', async (req, res) => {
    var user = await User.findOne({email: req.body.email});
    console.log(user);
    if (!user) res.send(404, {message: 'no such user'});
    bcrypt.compare(req.body.pwd, user.pwd, (err, isMatch) => {
        console.log(isMatch);
        if (!isMatch)
            return res.status(401).send({message: 'no such password'});
        var payload = {};
        var token = jwt.encode(payload, '123')
        console.log(token)
        res.status(200).send({token})
    })
})

module.exports=router;
