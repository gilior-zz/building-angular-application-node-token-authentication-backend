var mngs = require('mongoose')

module.exports = mngs.model('Post', {
    msg: String
})