
const {User} = require('../models/user'); 
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//GET /api/users get all users

router.get('/', async (req, res) => {
    const users = await User.find({});
    res.send(users);
  });

//POST /api/users/register add a new user/admin

router.post('/register', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const type = req.body.type;

    const user = await User.findOne({email: email});
    if (user) {
        return res.status(404).send('User with this email id already exists');
    } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        user = await User.save({
            name: name,
            email: email,
            hashed_password: hash,
            created_at: new Date(),
            type: type
        });
        res.send(user);
    }
  });


module.exports = router;