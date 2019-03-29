const express = require('express');
const router = express.Router();

const Trip = require('../models/trip');

const { isLoggedIn } = require('../helpers/middlewares');

router.post('/create', isLoggedIn(), (req, res, next) => {

  const { cityTo, price } = req.body;

  const newtrip = new Trip({
    destination: cityTo,
    price,
    owner: req.session.currentUser._id
  })

  const saveTrip = newtrip.save().then((data) => res.json(data))

})

module.exports = router;
