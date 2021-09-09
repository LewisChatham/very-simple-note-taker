const notes = require('express').Router()
const uuid = require('../helpers/uuid')
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

notes.post('/', (req, res) => {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuid()
    }
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            json.push(newNote)
            writeToFile('./db/db.json', json)
            res.json(json)
        })
})

module.exports = notes