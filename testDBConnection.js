// Import Sequalize and other libraires
import { Sequelize } from '@sequelize/core';

// Imports dontenv module and allows us to access stored environment variables stored in .env file
import 'dotenv/config';

// Connects to the database
const sequelize = new Sequelize(process.env.API_URL);

//Testing that the .env file is working - This should print out the port number
console.log(process.env.PORT); //Should print out 8080 
console.log(process.env.API_Key); //Should print out API Key information:

// Testing the connection, try and catch statements to see if anything goes wrong.
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.'); // You should see this in the terminal if you have successfully connected to the database.
}
catch (error) {
    console.error('Unable to connect to the database: ', error);
}