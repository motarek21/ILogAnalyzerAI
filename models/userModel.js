const db = require('./db');

// Create Users table
const createUsersTable = async () => {
  try {
    await db.query(`
      DROP TABLE IF EXISTS users CASCADE;
      CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        user_name VARCHAR(255) NOT NULL
      );
      
      -- Insert default admin user
      INSERT INTO users (email, password, company, user_name)
      VALUES ('admin@loganalyzer.ai', 'admin1234', 'logai', 'admin')
      ON CONFLICT (email) DO NOTHING;
    `);
    console.log('Users table created and initialized');
    return true;
  } catch (error) {
    console.error('Error creating Users table:', error);
    throw error;
  }
};

// Create a new user
const createUser = async (email, password, company, userName) => {
  try {
    const result = await db.query(
      'INSERT INTO users (email, password, company, user_name) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, password, company, userName]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Find user by email
const findUserByEmail = async (email) => {
  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
};

// Find user by ID
const findUserById = async (userId) => {
  try {
    const result = await db.query('SELECT * FROM users WHERE user_id = $1', [userId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw error;
  }
};

// Update user
const updateUser = async (userId, userData) => {
  const { email, password, company, userName } = userData;
  try {
    const result = await db.query(
      'UPDATE users SET email = $1, password = $2, company = $3, user_name = $4 WHERE user_id = $5 RETURNING *',
      [email, password, company, userName, userId]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete user
const deleteUser = async (userId) => {
  try {
    await db.query('DELETE FROM users WHERE user_id = $1', [userId]);
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

module.exports = {
  createUsersTable,
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
  deleteUser
}; 