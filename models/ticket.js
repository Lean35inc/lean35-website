
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
 
var TicketSchema = new Schema({
  name : String,
  email : String,
  phone: String,
  message: String
});


mongoose.model('Ticket', TicketSchema );