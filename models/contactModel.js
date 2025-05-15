const db = require('./db');

// Create Contact table
const createContactTable = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS contact (
        message_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        message TEXT NOT NULL
      )
    `);
    console.log('Contact table created or already exists');
    return true;
  } catch (error) {
    console.error('Error creating Contact table:', error);
    return false;
  }
};

// Create a new contact message
const createContactMessage = async (name, email, phone, message) => {
  try {
    const result = await db.query(
      'INSERT INTO contact (name, email, phone, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, phone, message]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating contact message:', error);
    throw error;
  }
};

// Get all contact messages
const getAllContactMessages = async () => {
  try {
    const result = await db.query('SELECT * FROM contact ORDER BY message_id DESC');
    return result.rows;
  } catch (error) {
    console.error('Error getting all contact messages:', error);
    throw error;
  }
};

// Get contact message by ID
const getContactMessageById = async (messageId) => {
  try {
    const result = await db.query('SELECT * FROM contact WHERE message_id = $1', [messageId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error getting contact message by ID:', error);
    throw error;
  }
};

// Delete contact message
const deleteContactMessage = async (messageId) => {
  try {
    await db.query('DELETE FROM contact WHERE message_id = $1', [messageId]);
    return true;
  } catch (error) {
    console.error('Error deleting contact message:', error);
    throw error;
  }
};

module.exports = {
  createContactTable,
  createContactMessage,
  getAllContactMessages,
  getContactMessageById,
  deleteContactMessage
}; 