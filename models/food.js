var mongoose = require("mongoose");

var foodSchema = new mongoose.Schema({
                   name: {type:String, required:true},
                   cuisineType: {type:String, required:true},
                   picImg: {type:String, required:true},
                   recipeLink: {type:String, required:true}
                  });


var Food = mongoose.model("Food", foodSchema);

module.exports = Food;