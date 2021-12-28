const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  id: {
    type: Number,

  },
  category: {
    type: Number,
    required: 'This field is required.'
  },
  img: {
    type: String,
    required: 'This field is required.'
  },
  shopName: {
    type: String,
    required: 'This field is required.'
  },
  address: {
    type: String,
    required: 'This field is required.'
  },
  cost: {
    type: Number,
    required: 'This field is required.'
  }
});

module.exports = mongoose.model('shops', shopSchema);