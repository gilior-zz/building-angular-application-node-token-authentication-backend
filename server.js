var express = require('express')
var cors = require('cors')
var pars = require('body-parser')
var mngs = require('mongoose');
var auth = require('./auth.js')
var jwt = require('jwt-simple');
mngs.promise = Promise;
var User = require('./models/users.js')
var Post = require('./models/Post.js')

var app = express();
var posts = [
    {message: 'hello'},
    {message: 'hi'}
]

app.use(cors())
app.use(pars.json())




app.get('/posts/:id', async (req, res) => {
        var author = req.params.id;
        var posts = await Post.find({author})
        res.send(posts)
    }
)

app.post('/post', auth.checkAuth, (req, res) => {
    var post = new Post(req.body);

    post.author = req.userId;
    post.save((err, res) => {
        if (err) {
            console.error('err on save post')
            return res.status(500).send({message: 'err on save post'})
        }

    })
    res.sendStatus(200)

})


app.get('/users', async (req, res) => {
    try {
        var users = await User.find({}, '-pwd -__v');
        res.send(users);
    }
    catch (err) {
        res.status(500).send({message: err})
    }
})

app.get('/profile/:id', async (req, res) => {

    try {
        var user = await User.findById(req.params.id, '-pwd -__v');
        res.send(user);
    }
    catch (err) {
        res.status(500).send({message: err})
    }
})


mngs.connect('mongodb://lg1:JKDH098(&@ds117336.mlab.com:17336/lgdb', {useMongoClient: true}, (err) => {
    if (!err)
        console.log('mng connected')
})

app.use('/auth', auth.router)
app.listen(process.env.Port|| 3000)