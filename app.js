var express = require("express"), 
    app = express();

app.set('view engine', 'ejs');

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
      res.render("index",{foods:food});
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


app.get("/food/:id/show",function(req,res){
  db.Food.findById(req.params.id, function(err,food){
    if(err){
      res.render("404");
    }else if(food){
      res.render("show",{food:food});
    }
  });
});


app.put("/food/:id",function(req,res){
  db.Food.findByIdAndUpdate(req.params.id, req.body.food,function(err,food){
    if (err) {
      res.render("404");
    }else{
      res.redirect("/");
    }

  });
});


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
    console.log("err is ", err);
    if(err){
      console.log(err);
      var errorText = "Name can't be blank";
      res.render("new", {error: errorText});
    } else {
      console.log(req.body.food);
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

