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



app.get("/",function(req,res){
  db.Food.find({},function(err,food){
    if(err){
      res.render("404");
    }else{
      res.render("index",{food:food});
    }
  });
});


app.get("/food/:id/edit",function(req,res){
  db.Food.findById(req.params.id, function(err,food){
    if(err){
      res.render("404");
    }else if(food){
      res.render("edit",{food:food});
    }
  });

});


app.get("/food/:id",function(req,res){
  db.Food.findById(req.params.id, function(err,food){
    if(err){
      res.render("404");
    }else if(food){
      res.render("show",{food:food});
    }
  });
});


app.put("/food/:id",function(req,res){
  db.Food.findById(req.params.id, req.body.food,function(err,food){
    if (err) {
      res.render("404");
    }else{
      res.redirect("/");
    }

  });
});

// name: {type:String, required:true},
// cuisineType: {type:String, required:true},
// picImg: {type:String, required:true},
// recipeLink: {type:String, required:true}

app.delete("/food/:id",function(req,res){
  db.Food.findByIdAndRemove(req.params.id,function(err,food){
    if (err) {
      res.render("404");
    }else if(food){
      res.redirect("/");
    }
  });
});

app.post("/food",function(req,res){
  db.Food.create(req.body.food,function(err,food){
    if(err){
      var errorText = "Title can't be blank";
      res.render("new", {error: errorText});
    } else {
      res.redirect("/");
    }
  });
});

app.get("/new",function(req,res){
  res.render("new");
});

app.listen(3000,function(){
  console.log("Got to localhost:3000/");
});

