
const express = require("express");
const app = express();

/* Call the Express function stored in app, call the .get
method stored in express(), pointing at the path ('/')
which essentially means "any get request to this URL" 
and then sends back a page.  Don't remember using
res.send so not sure why this is the choice, but we are
sending back HTML text in response to GET requests. */

app.get('/', (req,res) => res.send(`<h1>Big Hello</h1>`));

/* This is how we're defining which port we want the server
to listen to.  Port something something || port 5000
In this case we use const instead of var because this value
will not be changing dynamically in the code.  */

const port = process.env.PORT || 5000

/* Using the .listen method of Express, telling it to listen
at the location we defined in 'port' and then the callback
console.logs a dynamic string.  

We run this in Nodemon so that server.js is listening.  Then,
by entering 127.0.0.1.5000 (port 5000 of the local host) we
are able to send the request from our browser to our server
and our server is able to send back the response. */

app.listen(port, () => console.log(`Server running on ${port}`));