const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.js'); 
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post('/', async (req, res) => {
    const newContact = req.body;

    try {
        
        if (!newContact.name || !newContact.phone) {
            return res.status(400).json({ message: 'Name and phone are required' });
        }

       
        const contact = await Contact.create(newContact);
        res.status(201).json(contact);
    } catch (error) {
        console.error('Error adding contact:', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Contact with this phone number already exists.' });
        }
        res.status(500).json({ message: 'Failed to add contact', error: error.message });
    }
});


router.put('/:id', async (req, res) => {
    const updatedContact = req.body;

    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, updatedContact, { new: true, runValidators: true });
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json(contact);
    } catch (error) {
        console.error('Error updating contact:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', details: error.message });
        }
        res.status(500).json({ message: 'Failed to update contact', error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const result = await Contact.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(204).send(); 
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ message: 'Failed to delete contact', error: error.message });
    }
});

module.exports = router;