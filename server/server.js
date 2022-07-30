const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    //console.log('request made')
    //console.log(req.url, req.method)

    // set header content type
    res.setHeader('Content-Type', 'text/html')

    // bad way to send response to browser
    //res.write('<h2>Hello mayowa</h2>')
    //res.end()

    // send an html file
    fs.readFile('./views/index.html', (err, data) => {
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