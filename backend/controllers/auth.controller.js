const bcrypt = require("bcrypt");
const e = require("express");
const jwt = require("jsonwebtoken");
const Users = require('../models/user.model');
const jwt_secret = process.env.JWT_SECRET;


//Registration new user
//Access: private
exports.create = function (req, res) {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({message: "Please enter all fields"});
    }

    //Check existing user with this mail
    Users.findOne({email}).then(async (user) => {
        if (user) return res.status(400).json({message: "User already exist"});

        const newUser = new Users({
            name,
            email,
            password,
        });

        //hash password and save
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, async (err, hash) => {
                if (err) throw err;
                newUser.password = hash;

                //get expired date token from settings
                let time_token_expired = 3600;

                newUser.save().then((user) => {
                    jwt.sign(
                        {id: user.id},
                        jwt_secret,
                        {expiresIn: time_token_expired},
                        (err, token) => {
                            if (err) throw err;
                            res.json({token,
                            user:{
                                name: user.name,
                                email: user.email,
                            }});
                        }
                    );
                });
            });
        });
    });
};


exports.auth = function (req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
    }

    //Check existing user by mail
    Users.findOne({ email }).then(async (user) => {
        if (!user) return res.status(400).json({ message: "User not exist" });


        //validate password
        bcrypt.compare(password, user.password).then(async (isMatch) => {
            //get expired date token from settings
            let time_token_expired = 3600;

            if (!isMatch)
                return res.status(400).json({ message: "Invalid credentials" });
            //add token after auth
            jwt.sign(
                { id: user.id },
                jwt_secret,
                { expiresIn: time_token_expired },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token,
                    user:{
                        name: user.name,
                        email: user.email
                    } });
                }
            );
        });
    });
};

