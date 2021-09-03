const notes = require('express').Router()
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');


notes.get('/', (req, res) => {
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            res.json(json)
        })
})

notes.delete('/:id', (req, res) => {
    const noteId = req.params.id
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id != noteId)
            writeToFile('./db/db.json', result)
            res.json(result)
        })
})

module.exports = notes