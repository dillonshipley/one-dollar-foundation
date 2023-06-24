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
    newEmail = newEmail.replace(/['"\\;\/\-\-/*%_\[\]]/g, '');
    return myString;
}

let client = null;

const establishConnection = async () => {
  try {
    client = new Client({
      user: databaseJSON.username,
      host: databaseJSON.host,
      database: databaseJSON.database,
      password: databaseJSON.password,
      port: databaseJSON.port
    });
    await client.connect();
  } catch (error) {
    reject(error);
  }
}
establishConnection();

const sendToDB = async (email, suggestion, client) => {
    const newEmail = sanitize(email);
    try {
        let count = await client.query('select subscriberid from subscribers order by subscriberid desc limit 1');
        if(count.rows.length == 0)
            count = 1; 
        else 
            count = count.rows[0].subscriberid;

        let exists = await client.query('select * from subscribers where email = \'' + newEmail + "\'")
        if(exists.rows.length > 0){
            return "Error";
        } else {
            const queryString = 'insert into subscribers (subscriberid, email, suggestion) values (' + (count) + ', \'' + newEmail + '\', \'' + suggestion + '\')';
            const res2 = await client.query(queryString);
            return "Success";
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteFromDB = (email, client) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newEmail = sanitize(email);
        await client.connect();
  
        const queryString = "delete from subscribers where email = '" + newEmail + "'";
        const res = await client.query(queryString);
  
        if (res.rowCount === 0) {
          resolve("This email address was not found in our database. Please try again.");
        } else {
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
    sendToDB(email, suggestion, client)
    .then((result) => {
        if(result === "Error"){
          console.log("Error - email " + email + " already exists");
        } else {
          console.log("Successfully inserted email: " + email + " with suggestion: " + suggestion)
        }
        response.json({message: result})
      })
      .catch((error) => {
        console.log(error);
        response.json({message: "Error"})
      });
})

app.post('/unsubscribe', (request, response) => {
    const {email} = request.body;
    deleteFromDB(email, client)
    .then((result) => {
        console.log(result);
        response.json({message: "Success"})
      })
      .catch((error) => {
        console.log(error);
        response.json({message: "Error"})
      });
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})