
const express = require("express");
const mongoose = require("mongoose");

/* links to the new JS files we created for the routing. */

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
make sense soon. */

app.use("/api/users", users);
app.use("/api/users", profiles);
app.use("/api/posts", posts);



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}`));