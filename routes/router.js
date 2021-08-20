var express = require('express');
var router = express.Router();
const { getRoot, postRoot,getprofile} = require('../controllers/user');

router
    .route('/')
    .get(getRoot)
    .post(postRoot);

router
    .route('/profile/:userid')
    .get(getprofile);

module.exports = router;