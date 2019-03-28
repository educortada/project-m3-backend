const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const tripSchema = new Schema({
  owner: {
    type: ObjectId,
    ref: 'User'
  },
  destination: {
    type: String,
  },
  date: {
    type: Number,
  },
  price: {
    type: Number,
  },
  persons: {
    type: Number,
  }
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;