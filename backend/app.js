const express = require('express')
const app = express()

let json = [
    {
        name: "Dillon",
        DOB: "12/10/2000"
    }
]

app.get('/', (request, response) => {
    response.send(json)
})

app.get('/api/people', (request, response) => {
    response.json(people)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})