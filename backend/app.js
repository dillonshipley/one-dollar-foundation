const express = require('express')
const cors = require('cors');
const excel = require('./formatExcel.js')

const app = express()
app.use(cors());

let formattedData = excel.formatExcel();
console.log(formattedData);

app.get('/', (request, response) => {
    response.send(formattedData)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})