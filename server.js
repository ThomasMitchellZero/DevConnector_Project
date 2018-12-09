
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

/* links to the new external JS files we created for the routing. */

const users = require("./routes/api/users.js");
const profiles = require("./routes/api/profiles.js");
const posts = require("./routes/api/posts.js");

const app = express();

// Body parser middleware
/* setting extended: false means this will only accept string or array values? */
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


const db = require('./config/keys.js').mongoURI;



mongoose
    .connect(db,{ useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected!"))
    .catch(err => console.log(err));

app.get('/', (req,res) => res.send(`<h1>Small Hello<h1>`));

/* This should be just a neater version of how we've handled URL reqs via 
Express in the past.  For instance, users is a const. that is equal to
whatever was exposed in the Export section of the file on the specified path.
In this case, it's a bunch of Express functions that look just like the
app.verb("/url", req res function{do stuff}) format we've seen in the past.  

Remember, these consts are ONLY loaded once - when server.js is run.  After 
that it's just there in memory like the stock JS methods.
*/

app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}`));