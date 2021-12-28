const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: 'This field is required.'
  },
  categoryName: {
    type: String,
    required: 'This field is required.'
  }
});

module.exports = mongoose.model('Categories', categorySchema);