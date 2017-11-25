var mngs = require('mongoose')
var bcrypt = require('bcrypt-nodejs')
var schem = new mngs.Schema({
    email: String,
    pwd: String,
    name: String,
    desc: String
})


schem.pre('save', function (next) {
        var user = this;
        if (!user.isModified('pwd'))
            return next()
        bcrypt.hash(user.pwd, null, null, (err, hash) => {
            if (err)
                return next(err)
         user.pwd=hash;
            next();
        })
    }
)

module.exports = mngs.model('User', schem)


