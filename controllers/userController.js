const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

class UserController {
  // Register a new user
  async registerUser(userData) {
    try {
      const { email, password, company, userName } = userData;
      
      // Check if user already exists
      const existingUser = await userModel.findUserByEmail(email);
      if (existingUser) {
        return {
          success: false,
          message: 'User already exists'
        };
      }
      
      // Hash password for new users
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create new user with hashed password
      const newUser = await userModel.createUser(email, hashedPassword, company, userName);
      
      return {
        success: true,
        user: {
          id: newUser.user_id,
          email: newUser.email,
          company: newUser.company,
          userName: newUser.user_name
        }
      };
    } catch (error) {
      console.error('Error in user registration:', error);
      return {
        success: false,
        message: 'Server error during registration'
      };
    }
  }
  
  // Sign in user
  async signInUser(email, password) {
    try {
      // Find user by email
      const user = await userModel.findUserByEmail(email);
      
      if (!user) {
        return { success: false, message: "Invalid email or password" };
      }
      
      // Special case for demo accounts
      if ((email === 'admin@loganalyzer.ai' && password === 'admin1234') ||
          (email === 'mohamed@logai.com' && password === 'pass123')) {
        return {
          success: true,
          user: {
            id: user.user_id,
            email: user.email,
            userName: user.user_name,
            company: user.company
          }
        };
      }
      
      // Compare password
      let isMatch = false;
      try {
        isMatch = await bcrypt.compare(password, user.password);
      } catch (error) {
        console.error('Error comparing passwords:', error);
        // If bcrypt comparison fails, try direct comparison for legacy passwords
        isMatch = (password === user.password);
      }
      
      if (!isMatch) {
        return { success: false, message: "Invalid email or password" };
      }
      
      return {
        success: true,
        user: {
          id: user.user_id,
          email: user.email,
          userName: user.user_name,
          company: user.company
        }
      };
    } catch (error) {
      console.error('Error in signInUser:', error);
      return { success: false, message: "Server error during authentication" };
    }
  }
  
  // Get user profile
  async getUserProfile(userId) {
    try {
      const user = await userModel.findUserById(userId);
      
      if (!user) {
        return {
          success: false,
          message: 'User not found'
        };
      }
      
      return {
        success: true,
        user: {
          id: user.user_id,
          email: user.email,
          company: user.company,
          userName: user.user_name
        }
      };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return {
        success: false,
        message: 'Server error while fetching profile'
      };
    }
  }
  
  // Update user profile
  async updateUserProfile(userId, userData) {
    try {
      // Find user by ID
      const user = await userModel.findUserById(userId);
      
      if (!user) {
        return {
          success: false,
          message: 'User not found'
        };
      }
      
      // Update user
      const updatedUser = await userModel.updateUser(userId, userData);
      
      return {
        success: true,
        user: {
          id: updatedUser.user_id,
          email: updatedUser.email,
          company: updatedUser.company,
          userName: updatedUser.user_name
        }
      };
    } catch (error) {
      console.error('Error updating user profile:', error);
      return {
        success: false,
        message: 'Server error while updating profile'
      };
    }
  }
}

module.exports = new UserController(); 