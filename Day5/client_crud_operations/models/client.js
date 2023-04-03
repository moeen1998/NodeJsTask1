const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ClientSchema = new Schema({

  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
  },
  lasNname: {
    type: String,
  },
  phone: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true
  } 
})

const Client = mongoose.model('clients', ClientSchema);
module.exports = Client;
