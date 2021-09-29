/** npm module imports */
const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
require('dotenv').config()
var cors = require('cors');
// for cors issues with

/** Source code imports */
// Mongoose models
const UserItem = require('./api/models/user-item');

// Routes
const routes = require('./api/routes/v1');


async function main() {



    const uri = process.env.DB_URL;

    const client = new MongoClient(uri);

    try {
        await client.connect();

        await listDatabases(client);

    } catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
    main().catch(console.error);

}

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};





// Miscellaneos

/* 
const db = require('db')
db.connect({
    name: process.env.DB_HOST,
    host: process.env.DB_USER,
    port: process.env.DB_PASS
}) */

// db config
const DB_NAME = process.env.DB_HOST;
const DB_URL = process.env.DB_USER;

/** Connect to our MongoDB database  
 **/
const PORT = process.env.PORT;

// Configure mongoose to tell us if we succeed or if we fail to connect to the database
mongoose.connection.on('open', () => `MongoDB: Successfully connected to ${DB_URL}`);
mongoose.connection.on('error', (error) => `MongoDB: Failed to connected to ${DB_URL}. Error ${error}`);

// IMPORTANT: If you are connecting to a database on your local machine be sure it is running first.
// We have to do this before we can save any Models to the database or get data from database.
console.log('MongoDB: Attempting to connect ...');
mongoose
    .connect(process.env.ATL_DB_URL)
    // handle error messages after successfully connectiong
    .catch(error => console.error(`MongoDB: Error ${error}`));

// Create some test data in the database for our app

//const USER_ITEMS = require('./test/data/user-items');

/* USER_ITEMS.forEach(item => {
    const userModel = new UserItem({ username: item.username, password: item.password });
    // NOTE: If desired see here for how to make this an upsert to get rid of annoying error messages:
    // https://masteringjs.io/tutorials/mongoose/upsert
    userModel
        .save()
        .catch(error => {
            console.log(`MongoDB: Error on save: `, error.errmsg);
        })
}); */

/** 
 * Create and start our express server 
 * **/

// express server config


console.log('starting express')
const app = express();

/** 
 * Configure express server middleware 
 **/

// this allows us to parse HTTP POST request bodies 
app.use(express.json());

app.use(cors());


// For development - console each HTTP request to the server
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} with param ${JSON.stringify(req.params)}`);
    // For things like POST requests that have a body in the HTTP request, print that too
    if (req.body) {
        console.log(JSON.stringify(req.body));
    }

    // We need to call next() to tell express that our middleware function here is done and
    // that express should pass the request on to the next handling function - which will either
    // be more middleware or our routing code!
    next();
});

/** Express server routes */
app.get('/', (req, res) => {
    res.send('Hello World!')
})

/** Mount all our various API routes here */
app.use('/v1', routes);

/** Start express server  */
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})