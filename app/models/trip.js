const mongoose = require('mongoose')

const tripSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true
  },
  transportation: {
    type: Number,
    required: true
  },
  lodging: {
    type: Number,
    required: true
  },
  costs: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  runningTotal: {
    type: Number,
    required: false
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

module.exports = mongoose.model('Trip', tripSchema)
