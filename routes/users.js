
const {User} = require('../models/user'); 
const bcrypt = require('bcryptjs');
const auth = require('basic-auth');
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
        let user = new User({
            name: name,
            email: email,
            hashed_password: hash,
            created_at: new Date(),
            type: type
        })
        user = await user.save();
        return res.status(200).send('User added successfully');
        //res.send(user);
    }
  });

  //POST /api/users/authenticate login/authenticate an user

  router.post('/authenticate', async (req, res) => {
    const credentials = auth(req);
    
    if (!credentials) {
        res.status(400).send('Invalid Request !');
    } else {
        const email = credentials.name;
        const password = credentials.pass;
        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(404).send('No such user found');
        } else {
            const hashed_password = user.hashed_password;
            if (bcrypt.compareSync(password, hashed_password)) {
                res.send(user);
            } else {
                return res.status(401).send('Invalid Credentials !');
            }
        }
    }

  });

  //POST /api/users/password/change   change password

  router.put('/password/change', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const new_password = req.body.new_password;

    const user = await User.findOne({email: email});
    if (user) {
        const hashed_password = user.hashed_password;
        if (bcrypt.compareSync(password, hashed_password)) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(new_password, salt);

            const user = await User.update(
                { email: email },
                { hashed_password: hash },
                { upsert: true });
            
            if (!user) return res.status(404).send('The password change failed.');

            res.send(user);

        } else {
            reject({ status: 401, message: 'Invalid Old Password !' });
        }
    } else {
        return res.status(404).send('User with this email id does not exist');
    }
  });

module.exports = router;