const express = require('express');
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

/* this is kind of slick.  Each ../ means "go up a folder from current directory" 
W're bringing in the User data model and we also get the methods of its parent
object. */
const User = require('../../models/User.js');

//@route get api/users/test
//@desc Tests users route
//@access Public

router.get('/test', (req, res) => res.json({msg:"Users Works!"}));

//@route get api/users/register
//@desc Register a user
//@access Public - they can't be logged in before they register

/*  We're trying to avoid duplicate accounts. 
    In the final version, the user will fill out a form on a web-page.
    When they hit the Submit button, that page will make a POST request
    to our server, and the contents of the fields they filled out will
    be in the body of that POST request, which IIRC is a JSON object.  So
    {name: xxx, email: xxx, etc.} */

router.post('/register', (req, res) => {
    
    /* 
    It seems that this line will get the email:value from the POST
    request and check all the email: members in the DB for a matching value.   
    User.findOne returns either true or false.
    */

    User.findOne({email: req.body.email})

    /* Using the .then function because we aren't storing the value returned
    by User.findOne() We're passing .then a parameter called user, which
    AFAICT is the boolean value returned by .findOne .  */
    .then(user => {
        
        /* If that value is true (i.e. a match was found), say we've 
        already got that one. */

        if(user){
            return res.status(400).json({email: 'Email already exists!'});
        }

        /* If it doesn't, add a new user to the database with al the values
        gotten from the POST request.  So email is serving as our unique
        identifier. */
        else{
            /* gets their avatar from Gravatar.  It's linked to their email,
            which is why we are passing req.body.email as the parameter. */
            const avatar = gravatar.url(req.body.email, {
                s: "200",  // avatar size
                r: "pg", // avatar maturity rating
                d: "mm"  // default avatar displayed.
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar: avatar
            });

            ////// ENCRYPTION //////

            /* Don't understand this at all but I will do my best. The overall
            purpose of this is so the user's password isn't stored as cleartext.
            */

            /*  Not sure why the top level is the Salt function and not the hash
            function.  This takes a number (how many rounds to salt).  Not sure
            what the other parameters do. I presume this generates the salt
            value and then passes that to callback, which is the hashing 
            function.  */
            bcrypt.genSalt(10, (err, salt) => {

                /* first parameter is the password to be hashed, second is the
                salt string we got from .genSalt, third is the callback that will
                run when .hash completes, and the hash parameter is the result of
                the hashed, salted password. */
                bcrypt.hash(newUser.password, salt, (err, hash)=> {
                    
                    /* If there's any error, stop the function. */
                    if (err) throw err;

                    /* If we've successfully made it to here, take the hash
                    parameter from above containing the hashed, salted password
                    and set that as the value of newUser.password */
                    newUser.password = hash;

                    /*AFAICT, so far the newUser object is still just in memory.  
                    The .save() method of Mongoose actually
                    saves it to the database. */
                    newUser.save()

                        /* There's some .promise shit I don't understand going
                        on here.  I'm honestly not sure how this function
                        resolves. */
                        .then(user => res.json(user))
                        .catch(err => console.log(err))

                })
            });
        }
    })

});

module.exports = router;