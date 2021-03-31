const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create a schema
const docSchema = new Schema({
  // You may need to add other fields like owner
  url: String,
  shortUrl: String,
  
});
const doc = mongoose.model('doc', docSchema);
module.exports = doc;