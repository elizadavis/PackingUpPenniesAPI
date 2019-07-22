const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
  higherItem: {
    type: String,
    required: true
  },
  higherCost: {
    type: Number,
    required: true
  },
  lowerItem: {
    type: String,
    required: true
  },
  lowerCost: {
    type: Number,
    required: true
  },
  difference: {
    type: Number,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},
{
  timestamps: true,
  toObject: {
    virtuals: true
  }
})

module.exports = mongoose.model('Expense', expenseSchema)
