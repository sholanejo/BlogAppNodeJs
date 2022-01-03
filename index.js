const express = require('express');
const app = new express();
const fileUpload = require('express-fileupload')
const ejs = require('ejs');
const validateMiddleware = require('./middleware/validationMiddleware')
const newPostController = require('./controllers/newPost')
const homePageController = require('./controllers/homePage')
const contactController = require('./controllers/contact')
const aboutController = require('./controllers/about')
const getPostController = require('./controllers/getPost')
const savePostController = require('./controllers/savePost')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/BlogApp', { useNewUrlParser: true })
console.log("Successfully connected to database");

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
app.use('posts/store', validateMiddleware)

app.get('/posts/new', newPostController);

app.get('/', homePageController);

app.get('/contact', contactController);

app.get('/about', aboutController);

app.get('/post/:id', getPostController);

app.post('/posts/store', savePostController);

app.listen(4000, () => {
    console.log('App listening on port 4000')
})