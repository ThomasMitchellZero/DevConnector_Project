/* naming convention for (data?) models is to be singular and 
start with a capital letter.  */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//Create the Schema

/* Not gonna lie, super lost here.  I don't know which parts of this 
syntax are syntactically required and which are by choice.  */

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

/* again, not really sure what I am seeing.  Why are we exporting this
and not just the UserSchema we just defined? Also, I think this is 
defining the variable User and exporting it all in one step, but not sure

I think the name can be anything and we're calling it the same as the file
for simplicity.*/

module.exports = User = mongoose.model('users',UserSchema);