const express = require("express")
const path = require("path")
const api = require("./routes")

const app = express();

const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use('/api', api)

app.use(express.static("public"))

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}`)
})