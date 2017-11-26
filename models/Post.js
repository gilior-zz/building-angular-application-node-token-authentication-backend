var mngs = require('mongoose')

module.exports = mngs.model('Post', {
    msg: String,
    author:{type:mngs.Schema.Types.ObjectId,ref:'User'}

})