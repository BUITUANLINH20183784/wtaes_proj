const mongoose = require("mongoose");

class General {
  fields = {};
  constructor() {
    this.fields.dateCreated = {
      type: Date,
      default: Date.now(),
    }
  }
}

module.exports = General