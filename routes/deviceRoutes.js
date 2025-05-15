const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');

// Get all devices for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await deviceController.getUserDevices(userId);
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in get user devices route:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get detailed information for a specific device
router.get('/:userId/:deviceMac', async (req, res) => {
  try {
    const userId = req.params.userId;
    const deviceMac = req.params.deviceMac;
    const result = await deviceController.getDeviceDetails(userId, deviceMac);
    
    if (!result.success) {
      return res.status(404).json(result);
    }
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in get device details route:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 