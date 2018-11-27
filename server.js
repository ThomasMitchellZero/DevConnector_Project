
const express = require("express");
const mongoose = require("mongoose");

/* links to the new external JS files we created for the routing. */

const users = require("./routes/api/users.js");
const profiles = require("./routes/api/profiles.js");
const posts = require("./routes/api/posts.js");

const app = express();


const db = require('./config/keys.js').mongoURI;



mongoose
    .connect(db,{ useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected!"))
    .catch(err => console.log(err));

app.get('/', (req,res) => res.send(`<h1>Small Hello<h1>`));

/* Not really sure about the syntax here.  Hopefully it will all
make sense soon. 

Once we have required Express, here is what I think is happening.
First parameter is a URL.  So far so good.  Second parameter is
supposed to be how to respond to a request to that URL.  Normally,
we put a function here, but I think in this case we are putting
a path to a file - in this case, the module that WILL contain
that function.  users, profiles, and posts are all constants
defined above to contain the path.  If I'm right, each method
will eventually contain something that looks like the 
function(req,res){ do something } that I have seen before.
*/

app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}`));