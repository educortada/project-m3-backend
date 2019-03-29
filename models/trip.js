const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const tripSchema = new Schema({
  owner: {
    type: ObjectId,
    ref: 'User',
  },
  destination: {
    type: String,
  },
  date: {
    type: Number,
    default: 20
  },
  price: {
    type: Number,
    
  },
  persons: {
    type: Number,
    default: 20
  }
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;