const express = require('express');
const router = express.Router();
const contactModel = require('../models/contactModel');

// Create a new contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Create new contact message
    const newContactMessage = await contactModel.createContactMessage(name, email, phone, message);

    res.status(201).json({
      success: true,
      contactMessage: newContactMessage
    });
  } catch (error) {
    console.error('Error creating contact message:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all contact messages
router.get('/', async (req, res) => {
  try {
    // Get all contact messages
    const contactMessages = await contactModel.getAllContactMessages();
    
    res.status(200).json({
      success: true,
      count: contactMessages.length,
      contactMessages
    });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get contact message by ID
router.get('/:id', async (req, res) => {
  try {
    const messageId = req.params.id;
    
    // Get contact message by ID
    const contactMessage = await contactModel.getContactMessageById(messageId);
    
    if (!contactMessage) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    res.status(200).json({
      success: true,
      contactMessage
    });
  } catch (error) {
    console.error('Error fetching contact message:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete contact message
router.delete('/:id', async (req, res) => {
  try {
    const messageId = req.params.id;
    
    // Get contact message by ID
    const contactMessage = await contactModel.getContactMessageById(messageId);
    
    if (!contactMessage) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    // Delete contact message
    await contactModel.deleteContactMessage(messageId);

    res.status(200).json({
      success: true,
      message: 'Contact message deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting contact message:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 