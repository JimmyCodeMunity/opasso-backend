const express = require('express');
const User = require('../models/UserModel');
const { getAllUsers, getAllSellers, Login,createUser } = require('../controllers/UserController');

const router = express.Router();
router.use(express.json());

//allow url encoded
router.use(express.urlencoded({extended:false}));


router.get('/usersdata',getAllUsers);

router.post('/login',Login);

router.post('/register',createUser);

module.exports = router;
