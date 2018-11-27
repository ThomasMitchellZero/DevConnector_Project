/* Not sure about this yet.  Express handles routing, but is 
the routing not being done in the main server.js app? */

const express = require("express");
const router = express.Router();

/* Instructor explicitly said we are using router.get, router.post,
etc. instead of app.get or app.post like we would if this were
in the server.js app.  Not sure why. 

One thing I do think is happening.  I don't have to put in the 
whole "/api/users/test route in here.  It looks like anything
that is directed here just needs its final destination?"*/


//@route get api/users/test
//@desc Tests users route
//@access Public

router.get('/test', (req, res) => res.json({msg:"Users Works!"}));

module.exports = router;