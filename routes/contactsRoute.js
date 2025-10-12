const express = require('express');

const router = express.Router();

const Contacts = require('../models/contacts');

// GET all Contacts
router.get('/', async (req, res) => {
  const contacts = await Contacts.find();
  res.json(contacts);
});

// GET contact by id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const contact = await Contacts.findById(id);

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.json(contact);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Create contact
router.post('/', async (req, res) => {
 try {

  const newContact = new Contacts(req.body);

  const savedContact = await newContact.save();

  res.status(201).json(savedContact);

 } catch (err) {
  res.status(400).json({ error: err.message });
 }
});

// Update Contact
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedContact = await Contacts.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true } 
        );

        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found'});
        }

        res.json(updatedContact);
    } catch (err) {
        res.status(400).json( { error: err.message });
    }
});

//Delete contact by id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deteleContact = await Contacts.findByIdAndDelete(id);

        if (!deteleContact) {
        return res.status(404).json({ message: 'Contact not found' });
        }

        res.json(deteleContact);
    } catch (err) {
        res.status(400).json( { error: err.message });
    }
});

//Delete all contacts
router.delete('/', async (req, res) => {
    try {
        const deteleAllContacts = await Contacts.deleteMany({});

        res.json(deteleAllContacts);
    } catch (err) {
        res.status(400).json( { error: err.message });
    }
});

module.exports = router;