const express = require('express');
const router = express.Router();

const Trip = require('../models/trip');

const { isLoggedIn } = require('../helpers/middlewares');

router.post('/create' , isLoggedIn(), (req, res, next) => {
  // console.log("create",req.session.currentUser)
})

module.exports = router;