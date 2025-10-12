const express = require('express');

const router = express.Router();

const Users = require('../models/users');

// GET all Users
router.get('/', async (req, res) => {
  const users = await Users.find();
  res.json(users);
});

// GET User by id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Users.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Create new user
router.post('/', async (req, res) => {
 try {

  const newUser = new Users(req.body);

  const savedUser = await newUser.save();

  res.status(201).json(savedUser);

 } catch (err) {
  res.status(400).json({ error: err.message });
 }
});

// Update User
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUser = await Users.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found'});
        }

        res.json(updatedUser);
    } catch (err) {
        res.status(400).json( { error: err.message });
    }
});

//Delete user by id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deteleUser = await Users.findByIdAndDelete(id);

        if (!deteleUser) {
        return res.status(404).json({ message: 'User not found' });
        }

        res.json(deteleUser);
    } catch (err) {
        res.status(400).json( { error: err.message });
    }
});

//Delete all users
router.delete('/', async (req, res) => {
    try {
        const deteleAllUsers = await Users.deleteMany({});

        res.json(deteleAllUsers);
    } catch (err) {
        res.status(400).json( { error: err.message });
    }
});

module.exports = router;