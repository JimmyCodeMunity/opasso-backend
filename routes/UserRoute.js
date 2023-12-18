const express = require('express');
const User = require('../models/UserModel');
const { getAllUsers, getAllSellers, Login,createUser,getAllUsersByEmail } = require('../controllers/UserController');

const router = express.Router();
router.use(express.json());

//allow url encoded
router.use(express.urlencoded({extended:false}));


router.get('/usersdata',getAllUsers);

router.post('/login',Login);

router.post('/register',createUser);

router.get('/usersdata/:email',getAllUsersByEmail);

module.exports = router;
