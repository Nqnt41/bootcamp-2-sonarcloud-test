// Imports dotenv module and allows us to access stored environment variables stored in .env file - See https://www.npmjs.com/package/dotenv
import 'dotenv/config';

// Import file system - Examples of how to use the file system module - fs - https://www.scaler.com/topics/nodejs/fs-module-in-node-js/
import * as fs from 'fs';

// Imports the Listing Model we created in ListingModels.js
import { Listing } from './ListingModel.js';

// Testing that the .env file is working - This should print out the port number
console.log(process.env.PORT); //Should print out 8080
console.log(process.env.API_Key); //Should print out the API Key
try {
    // Setup table in the DB
    // Read more about Model Synchronization - https://sequelize.org/docs/v6/core-concepts/model-basics/#model-synchronization
    await Listing.sync({ force: true });
    console.log("The table for the Listing model was just (re)created!");

    // This callback function read the listings.json file into memory (data) and stores errors in (err).
    // Saves data in Listing variable and displays it on ElephantSQL.
    fs.readFile('listings.json', 'utf8', function(err, data) {
        // Throws an error if the data is not available.
        if (err) throw err
        {
            console.log(data);
        }

        // Save and parse the data from the listings.json file into a variable, so that we can iterate through each instance - Similar to Bootcamp#1
        // First parses the data from the JSON file and stores it in listingData variable.
        // Afterward, turns listingData into an array used to convert data over to ElephantSQL.
        const listingData=JSON.parse(data)
        const listingArray = listingData.entries;

        // Use Sequelize create a new row in our database for each entry in our listings.json file using the Listing model we created in ListingModel.js
        // to https://sequelize.org/docs/v6/core-concepts/model-instances/#creating-an-instance
        // Uses a for loop to iterate throughout the listingArray's elements one by one, adding them to the database individually.
        // Checks if each element has a latitude and longitude via a try and catch statement. If there is none, the array is printed without the optional details.
        // If there is a latitude and longitude, coordinates are put on the output.
        for (let i = 0; i < listingArray.length; i++) {
            try {
                listingArray[i].latitude = listingArray[i].coordinates.latitude
                listingArray[i].longitude = listingArray[i].coordinates.longitude
                Listing.create(listingArray[i])
            }
            catch {
                Listing.create(listingArray[i])
            }
        }
    });
}
catch (error) {
    console.error('Unable to connect to the database:', error);
}

// Once you've written + run the script, check out your ElephantSQL database to ensure that it saved everything correctly.