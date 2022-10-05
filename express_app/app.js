const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { has } = require('lodash')
const Blog = require('./models/blog')
const { urlencoded } = require('express')
const { render } = require('ejs')
    // connect to mongodb
const dbURI = 'mongodb+srv://mayowafunmi:mayowafunmi@nodejstutorial.oycapba.mongodb.net/nodejs-tutorial?retryWrites=true&w=majority'

mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((result) => app.listen(3000))
    .catch((err) => console.log(err))

// register view engine for template
app.set('view engine', 'ejs'); // by default, express and ejs looks for views folder
//app.set('views', 'myviews') // if ejs files inside folder (myviews) aside views

// basic user auths
app.use(express.json()) // to accept json object
const users = []

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', (req, res) => {
    try {
        const salt = bcrypt.genSalt()
        const hashedPassword = bcrypt.hash(req.body.password, salt)
        console.log(salt)
        console.log(hashedPassword)
        const user = {
            name: req.body.name,
            password: req.body.password
        }
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }

    //console.log(users)
})

// middleware
// app.use((req, res, next) => {
//     console.log('new request made')
//     console.log('host: ', req.hostname)
//     console.log('path: ', req.path)
//     console.log('method: ', req.method)
//     next()
// })

// app.use((req, res, next) => {
//     console.log('in the next middleware')
//     next()
// })
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })); // to get form data
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
    //res.send('<p>home page</p>')
    //res.sendFile('./views/index.html', { root: __dirname })
    // const blogs = [
    //     { title: 'This is title 1', snippet: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.' },
    //     { title: 'This is title 2', snippet: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.' },
    //     { title: 'This is title 3', snippet: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.' }
    // ]
    // res.render('index', { title: 'Home Page', blogs })
    res.redirect('/blogs');
})

app.get('/about', (req, res) => {
    //res.sendFile('./views/about.html', { root: __dirname })
    res.render('about', { title: 'About Page' })
})

// blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err);
        })
})

app.post('/create-post', (req, res) => {
    const blog = new Blog(req.body)
    blog.save()
        .then(() => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/blogs/get_blog_post/:id', (req, res) => {
        const id = req.params.id;
        Blog.findById(id)
            .then((result) => {
                res.render('details', { blog: result, title: 'Blog Detail' })
            })
            .catch((err) => {
                console.log(err);
            })
    })
    // create
app.get('/blogs/create', (req, res) => {
        res.render('create', { title: 'New Blog' })
    })
    // redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

// ===================Database Interraction using mongoose================================
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog',
        body: 'more articles about my new blog'
    });
    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/single-blog', (req, res) => {
    Blog.findById('633d3e89785497ccbf370380')
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

// =============================================================

// 404 error
app.use((req, res) => {
    //res.status(404).sendFile('./views/404.html', { root: __dirname })
    res.status(404).render('404', { title: 'Error Page' })
})