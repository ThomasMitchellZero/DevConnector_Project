const express = require("express");
const router = express.Router();


//@route get api/profiles/test
//@desc Tests profiles route
//@access Public
router.get('/test', (req, res) => res.json({msg:"Profiles Works!"}));

module.exports = router;