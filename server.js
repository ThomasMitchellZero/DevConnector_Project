var savemycomments = 3;
//add some comments

const express = require("express");
const app = express();


app.get('/', (req,res) => res.send(`<h1>Big Hello</h1>`));


const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on ${port}`));