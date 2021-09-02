const notes = require('express').Router()
const noteData = require('../db/db.json')
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');


notes.get('/', (req, res) => {
    res.json(noteData)
})

notes.delete('/:id', (req, res) => {
    const noteId = req.params.id
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id !== noteId)
            res.json(result)
            writeToFile('./db/db.json', result)
        })
})

module.exports = notes
