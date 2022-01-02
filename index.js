const express = require('express');
const path = require('path');
const app = new express();
const ejs = require('ejs');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/BlogApp', { useNewUrlParser: true })
const BlogPost = require('./models/BlogPost.js')
console.log("Successfully connected to database");
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', async(req, res) => {
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts
    })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/post/:id', async(req, res) => {
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    })
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})

app.post('/posts/store', async(req, res) => {
    await BlogPost.create(req.body)
    res.redirect('/')


})

app.listen(4000, () => {
    console.log('App listening on port 4000')
})