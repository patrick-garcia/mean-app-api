const mongoose = require('mongoose');
const sequencing = require('./sequencing');

const PolicySchema = new mongoose.Schema({
  _id: Number,
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true,
  }
},
{ _id: false }
);

PolicySchema.pre("save", function (next) {
  let doc = this;
  sequencing.getSequenceNextValue("user_id").
  then(counter => {
    if(!counter) {
      sequencing.insertCounter("user_id")
      .then(counter => {
          doc._id = counter;
          next();
      })
      .catch(error => next(error))

    } else {
      doc._id = counter;
      next();
    }
  })
  .catch(error => next(error))
});

const Policy = mongoose.model('Policy', PolicySchema);

module.exports = Policy;