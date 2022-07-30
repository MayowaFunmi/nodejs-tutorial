const people = ['mayowa', 'esther', 'wale', 'bisi', 'tayo']
const ages = [54, 75, 34, 55, 88]
const city = ['lagos', 'ibadan']
    //console.log(ages)

// to get people file data in another file
//module.exports = people // single data

module.exports = {
    names: people,
    ages: ages,
    people,
    city
}