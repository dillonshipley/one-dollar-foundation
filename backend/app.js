const express = require('express')
const cors = require('cors');
const excel = require('./formatExcel.js')

const app = express()
app.use(cors());

let formattedData = excel.formatExcel();
console.log(formattedData);

app.use(express.json());

app.get('/', (request, response) => {
    response.send(formattedData)
})

app.post('/subscribe', (request, response) => {
    console.log(request.body);
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})