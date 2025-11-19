const names = require("./04-names.js");
const greet = require("./05-utils.js");
const places = require("./06-alternative-flavor.js");
require("./07-mind-grenade.js"); 

console.log(names);
console.log(places);

greet(names.firstName);
greet(names.lastName);
