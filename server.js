
const express = require("express");
const mongoose = require("mongoose");

const app = express();

//DB configuration
/* ./config means "find a folder called config in the top-level
folder."  mongoURI is the key we gave to the value of the URI
string in our  */
const db = require('./config/keys.js').mongoURI;

//connect to MongoDB

/* Not sure what Mongoose does, but we required it above.
First, we use the connect method, passing it our URI string
from the keys.js file as a target.  The bit about the URL
parser came in response to an error message saying the string
parser was deprecated.

This mentions Promises, which I don't quite understand yet.  
but what seems to be happening is that if we successfully
connect, we console.log an error message and if not, the
.catch method gets an external error message and then we
console.log that error.

Making a change to the password or username in the keys.js file
triggers this change.
 */

mongoose
    .connect(db,{ useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected!"))
    .catch(err => console.log(err));

app.get('/', (req,res) => res.send(`<h1>Small Hello<h1>`));

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on ${port}`));