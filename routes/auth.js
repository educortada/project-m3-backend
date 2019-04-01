const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

const { isLoggedIn, isNotLoggedIn, validationLoggin } = require('../helpers/middlewares');

router.get('/me', isLoggedIn(), (req, res, next) => {
  res.json(req.session.currentUser);
});

router.post('/login', isNotLoggedIn(), validationLoggin(), (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({
    username
  })
    .then((user) => {
      if (!user) {
        const err = new Error('Not Found');
        err.status = 404;
        err.statusMessage = 'Not Found';
        next(err)
      }
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        return res.status(200).json(user);
      } else {
        const err = new Error('Unauthorized');
        err.status = 401;
        err.statusMessage = 'Unauthorized';
        next(err);
      }
    })
    .catch(next);
});

router.post('/signup', isNotLoggedIn(), validationLoggin(), (req, res, next) => {
  const { username, password, email } = req.body;

  User.findOne({
    username
  }, 'username')
    .then((userExists) => {
      if (userExists) {
        const err = new Error('Unprocessable Entity');
        err.status = 422;
        err.statusMessage = 'username-not-unique';
        next(err);
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username,
        email,
        password: hashPass,
        avatarURL: 'https://firebasestorage.googleapis.com/v0/b/project-m3-322bd.appspot.com/o/images%2Favatar-default.png?alt=media&token=850710b7-3f8d-4115-8977-0b71c4603b5b'
      });

      return newUser.save().then(() => {
        req.session.currentUser = newUser;
        res.status(200).json(newUser);
      });
    })
    .catch(next);
});

router.post('/logout', isLoggedIn(), (req, res, next) => {
  req.session.destroy();
  return res.status(204).send();
});

router.get('/private', isLoggedIn(), (req, res, next) => {
  res.status(200).json({
    message: 'This is a private message'
  });
});

router.put('/profile/update', isLoggedIn(), (req, res, next) => {
  const { username, email, avatarURL } = req.body
  const { _id } = req.session.currentUser

  return User.findByIdAndUpdate(_id, { username, email, avatarURL }, { new: true })
    .then((data) => {
      req.session.currentUser = data
      res.json(data)
    })
})

module.exports = router;
