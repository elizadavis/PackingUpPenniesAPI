const express = require('express')
const passport = require('passport')
const Trip = require('../models/trip')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })
const removeBlanks = require('../../lib/remove_blank_fields')

const router = express.Router()

router.get('/trips', (req, res, next) => {
  Trip.find()
    .then(trips => {
      return trips.map(trip => trip.toObject())
    })
    .then(trips => res.status(200).json({ trips: trips }))
    .catch(next)
})

router.get('/trips/:id', (req, res, next) => {
  Trip.findById(req.params.id)
    .then(handle404)
    .then(trip => res.status(200).json({ trip: trip.toObject() }))
    .catch(next)
})

router.delete('/trips/:id', requireToken, (req, res, next) => {
  Trip.findById(req.params.id)
    .then(handle404)
    .then(trip => {
      requireOwnership(req, trip)
      trip.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.patch('/trips/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.trip.owner
  Trip.findById(req.params.id)
    .then(handle404)
    .then(trip => {
      requireOwnership(req, trip)
      return trip.update(req.body.trip)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.post('/trips', requireToken, (req, res, next) => {
  req.body.trip.owner = req.user.id
  Trip.create(req.body.trip)
    .then(trip => {
      res.status(201).json({ trip: trip.toObject() })
    })
    .catch(next)
})

module.exports = router
