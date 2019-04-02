const express = require('express');
const router = express.Router();

const Trip = require('../models/trip');
const { isLoggedIn } = require('../helpers/middlewares');

router.post('/create', isLoggedIn(), (req, res, next) => {
  const { cityTo, price, dTime, aTime, route} = req.body.flight;
  const { adults, photoCity } = req.body

  const newtrip = new Trip({
    imgUrl: photoCity,
    destination: cityTo,
    adults,
    price,
    startFrom: dTime,
    startTo: aTime,
    returnFrom: route[1].dTime,
    returnTo: route[1].aTime,
    owner: req.session.currentUser._id
  })
  const saveTrip = newtrip.save().then((data) => res.json(data))
})

router.get('/flights', isLoggedIn(), async (req, res, next) => {
  try {
    const currentUser = req.session.currentUser
    const flights = await Trip.find({ owner: currentUser._id })
    res.status(200).json(flights);

  } catch (error) {
    next(error)
  }
})

module.exports = router;
