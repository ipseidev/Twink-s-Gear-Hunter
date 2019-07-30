const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AuctionSchema = new Schema({
  auctions: {
    type: Array,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("auctions", AuctionSchema);