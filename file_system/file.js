const fs = require('fs')

//read file
fs.readFile('./doc/blog1.txt', (err, data) => {
    if (err) {
        console.log(err)
    }
    console.log(data.toString())
})

//write file
fs.writeFile('./doc/blog1.txt', 'hello world', () => {
    console.log('file was written')
})

//directories
if (fs.existsSync('./assets')) {
    fs.rmdir('./assets', (err) => {
        if (err) {
            console.log(err)
        }
        console.log('file already exists and now deleted')
    })
} else {
    fs.mkdir('./assets', (err) => {
        if (err) {
            console.log(err)
        }
        console.log('folder created')
    })
}

//delete files
if (fs.existsSync('./doc/deleteme.txt')) {
    fs.unlink('./doc/deleteme.txt', (err) => {
        if (err) {
            console.log(err)
        }
        console.log('file deleted')
    })
} else {
    console.log('file does not exist')
}