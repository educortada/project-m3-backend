const express = require('express');
const router = express.Router();

const Favorite = require('../models/favorite');
const { isLoggedIn } = require('../helpers/middlewares');

router.post('/create', isLoggedIn(), (req, res, next) => {
  const { cityTo, price, dTime, aTime, route} = req.body.flight;
  const { adults, photoCity } = req.body

  const newFavorite = new Favorite({
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
  const saveFavorite = newFavorite.save().then((data) => res.json(data))
})

router.get('/get', isLoggedIn(), async (req, res, next) => {
  try {
    const currentUser = req.session.currentUser
    const favorite = await Favorite.find({ owner: currentUser._id })
    res.status(200).json(favorite);

  } catch (error) {
    next(error)
  }
})

router.get('/detail/:id', isLoggedIn(), async (req, res, next) => {
  const {id} = req.params
  
  try {
    const favorite = await Favorite.findById(id)
    res.status(200).json(favorite);

  } catch (error) {
    next(error)
  }
})

router.delete('/detail/:id', isLoggedIn(), async (req, res, next) => {
  const {id} = req.params
  
  try {
    const favorite = await Favorite.findByIdAndDelete(id)
    res.status(200).json(favorite);

  } catch (error) {
    next(error)
  }
})

module.exports = router;
