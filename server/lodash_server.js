const http = require('http')
const fs = require('fs')
const _ = require('lodash')


const server = http.createServer((req, res) => {

    // lodash
    const num = _.random(0, 25)
    console.log(num)

    const greet = _.once(() => {
        console.log('hello')
    })

    greet()
    greet()

    res.setHeader('Content-Type', 'text/html')


    // using routing

    let path = './views/'
    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200
            break
        case '/about':
            path += 'about.html'
            res.statusCode = 200
            break;
            // redirect
        case '/about-us':
            res.statusCode = 301
            res.setHeader('Location', '/about')
            res.end()
            break;
        default:
            path += '404.html'
            res.statusCode = 400
            break
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err)
            res.end()
        } else {
            res.write(data) // if responding only one item, use res.end(data)
            res.end()
        }
    })
})

server.listen(3000, 'localhost', () => {
    console.log('listening for request on port 3000')
})