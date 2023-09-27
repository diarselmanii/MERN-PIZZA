const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const mysqlConnection = require('../dbconnect.js');

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Insert new user into MongoDB
    const newUser = new User({ name, email, password });

    try {
        await newUser.save();
        console.log('User Registered with success in MongoDB');
    } catch (error) {
        console.error('Error creating new user in MongoDB: ', error);
        return res.status(400).json({ message: error });
    }

    // Insert new user into MySQL
    const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    const values = [name, email, password];

    mysqlConnection.query(query, values, (error, results, fields) => {
        if (error) {
            console.error('Error creating new user in MySQL: ', error);
            return res.status(400).json({ message: error });
        }
        console.log('New user created with ID: ', results.insertId);
        res.send('User Registered with success in MySQL');
    });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.find({ email, password });

        if (user.length > 0) {
            const currentUser = {
                name: user[0].name,
                email: user[0].email,
                isAdmin: user[0].isAdmin,
                _id: user[0]._id,
            };
            res.send(currentUser);
        } else {
            return res.status(400).json({ message: 'User Login Failed' });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' });
    }
});

router.get('/getallusers', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post('/deleteuser', async (req, res) => {
    const userid = req.body.userid;

    try {
        await User.findOneAndDelete({ _id: userid });
        res.send('User deleted Successfully');
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});



//edit user 
router.post("/edituser", async (req, res) => {
    const editeduser = req.body.editeduser
    try {
        const useri = await User.findOne({ _id: editeduser._id })

        useri.name = editeduser.name,
        useri.email = editeduser.email,
        useri.password = editeduser.password,
        useri.isAdmin = editeduser.isAdmin
       

        await useri.save()
        res.send('User details edited succesfully')

    } catch (error) {
        return res.status(400).json({ message: error })

    }
})



//get prof by id
router.post("/getuserbyid", async (req, res) => {
    const userid = req.body.userid


    try {
        const useri = await User.findOne({ _id: userid })
        res.send(useri)
    } catch (error) {
        return res.status(400).json({ message: error })

    }
})
module.exports = router;
