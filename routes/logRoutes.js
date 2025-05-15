const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

// Create a new log
router.post('/', async (req, res) => {
  try {
    const result = await logController.createLog(req.body);
    
    if (!result.success) {
      return res.status(400).json(result);
    }
    
    res.status(201).json(result);
  } catch (error) {
    console.error('Error in create log route:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get logs by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await logController.getUserLogs(userId);
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in get user logs route:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get log statistics for charts
router.get('/statistics/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await logController.getLogsStatistics(userId);
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in get log statistics route:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get logs for a specific device
router.get('/device/:userId/:deviceMac', async (req, res) => {
  try {
    const userId = req.params.userId;
    const deviceMac = req.params.deviceMac;
    const result = await logController.getDeviceLogs(userId, deviceMac);
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in get device logs route:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get log by ID
router.get('/:id', async (req, res) => {
  try {
    const logId = req.params.id;
    const result = await logController.getLogById(logId);
    
    if (!result.success) {
      return res.status(404).json(result);
    }
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in get log by id route:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 