const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../modals/user');

module.exports = {
    createUser: async ({ userInput }) => {
        try {
          const { fullname, email, password } = userInput;
      
          // Check if user with the provided email already exists
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            throw new Error('User already exists');
          }
      
          const hashedPassword = await bcrypt.hash(password, 12);
          const user = new User({ fullname, email, password: hashedPassword });
          await user.save();
          console.log('User created:', user);
          return user;
        } catch (error) {
          console.error('Error creating user:', error);
          throw new Error('Failed to create user');
        }
      },
  
  login: async ({ email, password }) => {
    try {
        console.log(email,password)
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User does not exist!');
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error('Invalid credentials!');
      }
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        "abcdefghijk",
        { expiresIn: '1h' }
      );
      console.log('User logged in:', user); // Log the logged-in user
      return { userId: user._id, token, tokenExpiration: 1 };
    } catch (error) {
      console.error('Error logging in:', error);
      throw new Error('Failed to login');
    }
  },
};
