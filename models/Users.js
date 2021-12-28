const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({

  username: {
    type: String,
    required: 'This field is required.'
  },
  
  password: {
    type: String,
    required: 'This field is required.'
  },

  role:{
    type: String,
    required: 'This field is required.'
  }

});

module.exports = mongoose.model('users', usersSchema);