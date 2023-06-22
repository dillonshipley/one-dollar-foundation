const express = require('express')
const cors = require('cors');
const excel = require('./formatExcel.js')

function sanitize(string){
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if(regex.test(string)){
        console.log('Email validated');
    } else {
        console.log('Invalid email');
    }
}

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
    const {email, suggestion} = request.body;
    sanitize(email);

})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})