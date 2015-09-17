var express = require("express"),
  app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname+"/public"));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var methodOverride = require('method-override');
app.use(methodOverride('_method'));

var morgan = require('morgan');
app.use(morgan('tiny'));

var db = require("./models");



// name: {type:String, required:true},
// cuisineType: {type:String, required:true},
// picImg: {type:String, required:true},
// recipeLink: {type:String, required:true}