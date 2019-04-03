const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const favoriteSchema = new Schema({
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

const Favorite = mongoose.model('favorite', favoriteSchema);

module.exports = Favorite;