// Syntax for importing ES Modules - https://www.geeksforgeeks.org/how-to-use-an-es6-import-in-node-js/
import { Sequelize, DataTypes } from '@sequelize/core';

// Imports dontenv module and allows us to access stored environment variables stored in .env file
import 'dotenv/config';

// Connect with the database
const sequelize = new Sequelize(process.env.API_URL);

// Create Sequalize Model for Listing
const Listing = sequelize.define('Listing', {
  // Model attributes are defined here, one by one. Coordinates put separately via latitude and longitude.
  // Code, e.g. "AAF"
  "code": {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Name, e.g. "Academic Advisement - Farrior Hall",
  "name": {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Latitude, e.g. 29.6502323
  "latitude": {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  // Longitude, e.g. -82.34563860000002
  "longitude": {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  // Address, e.g. "100 Fletcher Dr, Gainesville, FL 32611, United States"
  "address": {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  // Other model options go here - specifically the name of the table.
  tableName: 'Listings'
});

// `sequelize.define` also returns the model.
console.log(Listing === sequelize.models.Listing); // true
console.log(Listing);

//Export the model 'Listing' in a single statement at the end of the module
export { Listing };
