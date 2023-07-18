// ---APP DECLARATION---
const express = require('express')
const cors = require('cors');
const app = express()
const corsOptions = {
  origin: 'https://localhost:3000/',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const crypto = require('crypto');


// ---DATABASE---
const { Pool } = require("pg");
const databaseJSON = require('./config.json')
const client = new Pool({
  user: databaseJSON.username,
  host: databaseJSON.host,
  database: databaseJSON.database,
  password: databaseJSON.password,
  port: databaseJSON.port
});


const executeQuery = async (query) => {
  console.log("Initiating Database Query: " + query);
  try {
    await client.connect();
    const data = await client.query(query);
    const result = data.rows;
    return result;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error; // Optional: Rethrow the error to be handled by the caller
  }
};


// ---EXCEL / JSON---
const excel = require('./formatExcel.js')
let formattedData = excel.formatExcel();

app.use(express.json());
app.get('/', (request, response) => {
    console.log("\nSending excel data to client...")
    response.send(formattedData)
    console.log("Excel data sent!")
})

// ---DATA MANAGEMENT---
function sanitize(myString){
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if(regex.test(myString)){
        console.log('Email validated');
    } else {
        console.log('Invalid email');
        return "";
    }
    let newEmail = myString.split("@");
    newEmail = newEmail[0] + "&" + newEmail[1];
    newEmail = newEmail.replace(/['"\\;\/\-\-/*%_\[\]]/g, '');
    return myString;
}



const sendToDB = async (email, suggestion) => {
    const newEmail = sanitize(email);
    if(newEmail === ""){
      return "InvalidError";  
    }
    try {
        let count = await executeQuery('select subscriberid from subscribers order by subscriberid desc limit 1');
        if(count.length == 0)
            count = 1; 
        else 
            count = count[0].subscriberid;

        let exists = await executeQuery('select * from subscribers where email = \'' + newEmail + "\'")
        if(exists.length > 0){
            return "ExistsError";
        } else {
            const queryString = 'insert into subscribers (subscriberid, email, suggestion) values (' + (count) + ', \'' + newEmail + '\', \'' + suggestion + '\')';
            const res2 = await executeQuery(queryString);
            return "Success";
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteFromDB = async (email) => {
    try {
      const newEmail = sanitize(email);  
      let queryString = "select * from subscribers where email = \'" + newEmail + "\'";
      const res = await executeQuery(queryString)
      if (res.length === 0) {
        console.log("This email address was not found in our database. Please try again.");
        return;
      }
      
      queryString = "delete from subscribers where email = \'" + newEmail + "\'";
      await executeQuery(queryString);
      console.log("Successfully deleted " + email + " from the database.")

    } catch (error) {
      console.log(error);
    }
  };




app.post('/subscribe', (request, response) => {
    const {email, suggestion} = request.body;

    console.log("\n-----Initiating Subscribtion: " + email + "-----");

    sendToDB(email, suggestion)
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
    console.log("\n-----Initiating Unsubscribtion: " + email + "-----");
    deleteFromDB(email)
    .then((result) => {
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