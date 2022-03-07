const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserTicketSchema = new Schema({
  tixId: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  comments: {
    type: Array,
  },
  newAdminComment: {
    type: Boolean,
    default: false,
  },
  newUserComment: {
    type: Boolean,
    default: false,
  },
  images: {
    type: Array,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = UserTicket = mongoose.model("userticket", UserTicketSchema);
