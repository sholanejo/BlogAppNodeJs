const express = require('express');
const app = new express();
const fileUpload = require('express-fileupload')
const ejs = require('ejs');
const flash = require('connect-flash')
const validateMiddleware = require('./middleware/validationMiddleware')
const newPostController = require('./controllers/newPost')
const homePageController = require('./controllers/homePage')
const contactController = require('./controllers/contact')
const aboutController = require('./controllers/about')
const getPostController = require('./controllers/getPost')
const savePostController = require('./controllers/savePost')
const newUserController = require('./controllers/createNewUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const storeUserController = require('./controllers/storeUser')
const logoutController = require('./controllers/logout')
const bodyParser = require('body-parser');
const redirectIfAuthenticatedMidddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const expressSession = require('express-session');
const authMiddleware = require('./middleware/authMiddleware')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/BlogApp', { useNewUrlParser: true }).then(() =>
{
    console.log("Successfully connected to database");
}).catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
});

global.loggedIn = null;

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
app.use('posts/store', validateMiddleware)
app.use(flash())
app.use(expressSession({
    secret: 'keyboard cat'
}))
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});

app.get('/posts/new', authMiddleware, newPostController);

app.get('/', homePageController);

app.get('/contact', contactController);

app.get('/about', aboutController);

app.get('/post/:id', getPostController);

app.get('/auth/register', redirectIfAuthenticatedMidddleware, newUserController);

app.get('/auth/login', redirectIfAuthenticatedMidddleware, loginController);

app.get('/auth/logout', logoutController);

app.post('/posts/store', authMiddleware, savePostController);

app.post('/users/register', redirectIfAuthenticatedMidddleware, storeUserController);

app.post('/users/login', redirectIfAuthenticatedMidddleware, loginUserController);

app.use((req, res) => res.render('notfound'))

app.listen(4000, () => {
    console.log('App listening on port 4000')
})
//testing new commit