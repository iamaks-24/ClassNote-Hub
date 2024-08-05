const mongoose = require('mongoose');
const User = require('./models/user.model.js'); // Adjust the path to your user model file
const { roles } = require('./utils/constants.js'); // Adjust the path to the constants file

// Connect to your MongoDB database
mongoose.connect('mongodb+srv://aishwaryas683:ncet_dms@dms-db.cvnk9nz.mongodb.net/?retryWrites=true&w=majority&appName=dms-db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Create a new user and save it to the database
const testUser = new User({
  username: 'testuser',
  password: 'testpassword',
  role: roles.client, // Use roles.client
  department: 'testdept'
});

testUser.save()
  .then(() => {
    console.log('User saved successfully');
    // Fetch the user from the database to check the hashed password
    return User.findOne({ username: 'testuser' });
  })
  .then(user => {
    console.log('Fetched user from database:', user);
    console.log('Stored password (hashed):', user.password);
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error:', err);
    mongoose.disconnect();
  });
