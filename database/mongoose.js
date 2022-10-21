const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const dbName = 'insurancedb';

mongoose.connect(
    `mongodb://127.0.0.1:27017/${dbName}`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log('db connected!!!');
  })
  .catch((err) => {
    console.log('error', err)
  })

module.exports = mongoose;