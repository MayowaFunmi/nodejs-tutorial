const express = require('express')

const app = express()

// register view engine for template
app.set('view engine', 'ejs'); // by default, express and ejs looks for views folder
//app.set('views', 'myviews') // if ejs files inside folder (myviews) aside views


// listen for request
app.listen(3000)

app.get('/', (req, res) => {
    //res.send('<p>home page</p>')
    //res.sendFile('./views/index.html', { root: __dirname })
    const blogs = [
        { title: 'This is title 1', snippet: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.' },
        { title: 'This is title 2', snippet: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.' },
        { title: 'This is title 3', snippet: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.' }
    ]
    res.render('index', { title: 'Home Page', blogs })
})

app.get('/about', (req, res) => {
    //res.sendFile('./views/about.html', { root: __dirname })
    res.render('about', { title: 'About Page' })
})

// create
app.get('/blogs/create', (req, res) => {
        res.render('create', { title: 'New Blog' })
    })
    // redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

// 404 error
app.use((req, res) => {
    //res.status(404).sendFile('./views/404.html', { root: __dirname })
    res.status(404).render('404', { title: 'Error Page' })
})