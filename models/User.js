const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  token: {
    type: String,
    required: false
  },
  itemsSearched: {
    type: Array,
    required: false
  }
});

module.exports = User = mongoose.model("users", UserSchema);
