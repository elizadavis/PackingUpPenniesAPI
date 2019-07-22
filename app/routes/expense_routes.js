const express = require('express')
const passport = require('passport')
const Expense = require('../models/expense')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })
const removeBlanks = require('../../lib/remove_blank_fields')

const router = express.Router()

router.get('/expenses', requireToken, (req, res, next) => {
  Expense.find()
    .then(expenses => {
      return expenses.map(expense => expense.toObject())
    })
    .then(expenses => res.status(200).json({ expenses: expenses }))
    .catch(next)
})

router.delete('/expenses/:id', requireToken, (req, res, next) => {
  Expense.findById(req.params.id)
    .then(handle404)
    .then(expense => {
      requireOwnership(req, expense)
      expense.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.patch('/expenses/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.expense.owner
  Expense.findById(req.params.id)
    .then(handle404)
    .then(expense => {
      requireOwnership(req, expense)
      return expense.update(req.body.expense)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.post('/expenses', requireToken, (req, res, next) => {
  req.body.expense.owner = req.user.id
  Expense.create(req.body.expense)
    .then(expense => {
      res.status(201).json({ expense: expense.toObject() })
    })
    .catch(next)
})

module.exports = router
