const express = require('express')
const cors = require('cors');
var postgres = require('postgres');
const crypto = require('crypto');
const { Client } = require("pg");

const excel = require('./formatExcel.js')
const databaseJSON = require('../../config.json')

function sanitize(myString){
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if(regex.test(myString)){
        console.log('Email validated');
    } else {
        console.log('Invalid email');
    }
    let newEmail = myString.split("@");
    newEmail = newEmail[0] + "&" + newEmail[1];
    return myString;
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
        
        console.log(newEmail);
        await client.connect()
        let count = await client.query('select subscriberid from subscribers order by subscriberid desc limit 1');
        if(count.rows.length == 0)
            count = 1; 
        else 
            count = count.rows[0].subscriberid;

        let exists = await client.query('select * from subscribers where email = \'' + newEmail + "\'")
        if(exists.rows.length > 0){
            await client.end();
            return "Error - email " + email + " already exists";
        } else {
            const queryString = 'insert into subscribers (subscriberid, email, suggestion) values (' + (count) + ', \'' + newEmail + '\', \'' + suggestion + '\')';
            const res2 = await client.query(queryString);
            await client.end();
            return "Successfully inserted email: " + email + " with suggestion: " + suggestion;
        }
    } catch (error) {
        console.log(error)
    }
}
const deleteFromDB = (email) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newEmail = sanitize(email);
        const client = new Client({
          user: databaseJSON.username,
          host: databaseJSON.host,
          database: databaseJSON.database,
          password: databaseJSON.password,
          port: databaseJSON.port
        });
  
        await client.connect();
  
        const queryString = "delete from subscribers where email = '" + newEmail + "'";
        const res = await client.query(queryString);
  
        if (res.rowCount === 0) {
          await client.end();
          resolve("This email address was not found in our database. Please try again.");
        } else {
          await client.end();
          resolve("Successfully deleted " + email + " from the database.");
        }
      } catch (error) {
        reject(error);
      }
    });
  };

const app = express()
app.use(cors());

let formattedData = excel.formatExcel();

app.use(express.json());

app.get('/', (request, response) => {
    response.send(formattedData)
})

app.post('/subscribe', (request, response) => {
    const {email, suggestion} = request.body;
    sendToDB(email, suggestion)
    .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        response.status(500).send('An error occurred');
      });
})

app.post('/unsubscribe', (request, response) => {
    const {email} = request.body;
    deleteFromDB(email)
    .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        response.status(500).send('An error occurred');
      });
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})