var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/food");

module.exports.Food = require("./food");