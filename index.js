// Installed node module 'node-fetch' to get data from the Star Wars API
const fetch = require('node-fetch');

// Get the argument of the command line instruction
const id = process.argv[2];

/* 
The use of Async / Await gives me the possibility to write a code easier to read
(instead of .then()).
The "try...catch" instruction allows me to alert the user in case of error during the process.
*/

async function getSumOfDiameter(id) {
  try {
    // Stock the data in a variable. Makes further treatment easier.
    let response = await fetch(`https://swapi.dev/api/films/${id}`);

    // Transform the data in JSON-format.
    // Decide to stock only useful property with "array destructuring".
    const { planets } = await response.json();

    // Create a variable to stock all the future results of my filter. 
    let result = [];

    // The "for loop" allows to fetch all the planets of a movie and apply data treatment.
    for (let i = 0; i < planets.length; i++) {
      response = await fetch(planets[i]);
      const planetData = await response.json();
      const { terrain, surface_water, diameter } = planetData;

      // Push in "result" the diameter of the planets that correspond to my conditions
      terrain.includes('mountains') && surface_water != 'unknown' && surface_water != '0'
        ? result.push(parseInt(diameter))
        : null;
    };

    // Use of reduce method to get the sum of all diameters
    console.log(result.reduce((a, b) => a + b, 0));
    console.log('ENJOY');

  } catch (error) {
    console.error(error);
  }
};

// Call function getSumOfDiameter
// Provide an error message for bad request
if (isNaN(id)) {
  console.error('I searched a Star Wars movie but I could not find anything. Could you please check your request and provide a number?  Thank you!');
} else if (id < 1 || id > 6) {
  console.error('No Star Wars movie found for this Id. Sorry. Please provide a number from 1 to 6.');
} else {
  console.log('Calculating...');
  getSumOfDiameter(id);
};

