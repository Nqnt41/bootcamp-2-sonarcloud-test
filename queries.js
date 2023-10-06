// Imports necessary modules
import { Sequelize } from '@sequelize/core';

// Imports dontenv module and allows us to access stored environment variables stored in .env file
import 'dotenv/config';

// Import Listing module
import { Listing } from './ListingModel.js';

// Connect to database via sequelize.
const sequelize = new Sequelize(process.env.API_URL);

//For this starter code I will use async-await and regular async functional notation. Feel free to ues the syntax that works best for you.
try {
    //Testing the connection via sequelize.
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
}
catch (error) {
    console.error('Unable to connect to the database:', error);
}

// Retrieves all listings from the database and adds them to the listings variable
async function retrieveAllListings() {
    //ADD CODE HERE
    console.log('Retrieving all listings');
    try {
        const listings = await Listing.findAll();
        console.log(listings.every(listing => listing instanceof Listing)); // true
        console.log("All users:", JSON.stringify(listings, null, 2));
    }
    catch (error) {
        console.error('Failed to retrieve all listings: ' + error);
    }
}

// Creates a listing variable containing the Library West information.
async function findLibraryWest() {
    console.log('Finding Library West');
    const listing = await Listing.findOne({ where: { name: 'Library West' } });
    // If Library West is not found on the list, report that information.
    try {
        console.log(listing.dataValues); // Output information
    }
    // If Library West is indeed found, return information on the library.
    catch (error) {
        console.error('Library West not found: ' + error);
    }
}

// Removes the entry with code CABL. Output error message if it fails, as done above.
async function removeCable() {
    console.log('Removing Cable BLDG');
    try {
        await Listing.destroy({where: {code: "CABL"}});
    }
    catch (error) {
        console.error("CABL not found: " + error)
    }
}

// Creates an additional listing for the Data Science and IT Building. Output error message if it fails, as done above.
async function addDSIT() {
    console.log('Adding the new DSIT BLDG that will be across from Reitz union. Bye Bye CSE, Hub, and French Fries.');
    try {
        const [listing, created] = await Listing.findOrCreate({
            where: {code: 'DSIT'},
            defaults: {
                code: "DSIT",
                name: "Data Science and IT Building"
            }
        });
    }
    catch (error) {
        console.error('DSIT addition failed: ' + error);
    }
}


//Updates Phelps Lab's address in the Listing. Output error message if it fails, as done above.
async function updatePhelpsLab() {
    console.log('UpdatingPhelpsLab.');
    try {
        await Listing.update({address: "1953 Museum Rd, Gainesville, FL 32603, United States"}, {where: {name: "Phelps Laboratory"}})
    }
    catch (error) {
        console.error('Phelps Lab update failed: ' + error)
    }
}

//Calling all the functions to test them, uses await to ensure compiler does not get overwhelmed.
console.log("Use these calls to test that your functions work. Use console.log statements in each so you can look at the terminal window to see what is executing. Also check the database.")
await retrieveAllListings()
await removeCable();
await addDSIT();
await updatePhelpsLab();
await findLibraryWest();