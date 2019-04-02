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
  imgUrl: {
    type: String,
  },
  date: {
    type: Number,
    default: 20
  },
  price: {
    type: Number,
  },
  adults: {
    type: Number,
  },
  startFrom: {
    type: String,
  },
  startTo: {
    type: String,
  },
  returnFrom: {
    type: String,
  },
  returnTo: {
    type: String,
  },
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;