const express = require('express')
const cors = require('cors')

const app = express()

// access the client can reach to server
app.use(cors())
app.use(express.json())

//using Express's parser instead of BodyParser
app.use(express.urlencoded({ extended: true }))

projectData = {}

app.get('/getAll', (req, res) => {
    res.status(200).send(projectData)
})

app.post('/addWeatherData', (req, res) => {
    projectData = req.body
    res.status(201).send(projectData)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
