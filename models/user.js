const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  avatarURL: {
    type: String,
    default: 'https://firebasestorage.googleapis.com/v0/b/project-m3-322bd.appspot.com/o/images%2Favatar-default.png?alt=media&token=850710b7-3f8d-4115-8977-0b71c4603b5b',
    required: true,
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;