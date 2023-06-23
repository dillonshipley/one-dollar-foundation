const express = require('express')
const cors = require('cors');
var postgres = require('postgres');
const excel = require('./formatExcel.js')
const databaseJSON = require('../../config.json')
const { Client } = require("pg")

const connectDb = async () => {
    try {
        const client = new Client({
            user: databaseJSON.username,
            host: databaseJSON.host,
            database: databaseJSON.database,
            password: databaseJSON.password,
            port: databaseJSON.port
        })
 
        await client.connect()
        const res = await client.query('SELECT * FROM subscribers')
        console.log(res.rows);
        await client.end()
    } catch (error) {
        console.log(error)
    }
}

function sanitize(myString){
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if(regex.test(myString)){
        console.log('Email validated');
    } else {
        console.log('Invalid email');
    }
    let newEmail = myString.split("@");
    newEmail = newEmail[0] + "&" + newEmail[1];
    return newEmail
}


const sendToDB = async (email, suggestion) => {
    const newEmail = sanitize(email);
    try {
        const client = new Client({
            user: databaseJSON.username,
            host: databaseJSON.host,
            database: databaseJSON.database,
            password: databaseJSON.password,
            port: databaseJSON.port
        })
 
        await client.connect()
        const count = await client.query('select subscriberid from subscribers order by subscriberid desc limit 1');
        const queryString = 'insert into subscribers (subscriberid, email, suggestion) values (' + (count.rows[0].subscriberid + 1) + ', \'' + newEmail + '\', \'' + suggestion + '\')';
        const res2 = await client.query(queryString);
        await client.end();
    } catch (error) {
        console.log(error)
    }
}

const app = express()
app.use(cors());

let formattedData = excel.formatExcel();

app.use(express.json());

app.get('/', (request, response) => {
    response.send(formattedData)
})

app.post('/subscribe', (request, response) => {
    const {email, suggestion} = request.body;
    sendToDB(email, suggestion);
})

app.post('/unsubscribe', (request, response) => {
    const x = request.body;
    console.log('x');
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})