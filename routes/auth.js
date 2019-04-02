const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

const { isLoggedIn, isNotLoggedIn, validationLoggin, validationSignup } = require('../helpers/middlewares');

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
        return res.status(404).json({
          error: true,
          code: 'Error! incorrect username and password!',
        })
      }
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        return res.status(200).json(user);
      }
      return res.status(404).json({
        error: true,
        code: 'Error! incorrect username or password!',
      });
    })
    .catch(next);
});

router.post('/signup', isNotLoggedIn(), validationSignup(), (req, res, next) => {
  const { username, password, email } = req.body;

  User.findOne({
    username
  }, 'username')
    .then((userExists) => {
      if (userExists) {
        return res.status(422).json({
          error: true,
          code: 'Error! username already exists.',
        });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username,
        email,
        password: hashPass,
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

  if (!username || !email) {
    return res.status(422).json({
      code: 'Error! check all empty fields',
    });
  }

  return User.findByIdAndUpdate(_id, { username, email, avatarURL }, { new: true })
    .then((data) => {
      req.session.currentUser = data
      res.json(data)
    })
})

module.exports = router;
