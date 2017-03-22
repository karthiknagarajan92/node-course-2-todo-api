var express = require("express");
var bodyParser = require("body-parser"); 

var {mongoose} = require("./db/mongoose.js");
var {Todo}=require("./models/todo.js");
var {User} = require("./models/user.js");

var app = express();

app.use(bodyParser.json());

app.listen(3000, ()=>{
	console.log("Started n listening on port 3000");
});

app.post("/todos",(req,res)=>{
	var todo = new Todo({
		text:req.body.text
	});

	todo.save().then((doc)=>{
		console.log("saved new record..",doc);
		res.send(doc);
	}).catch(function(err){
		res.status(400).send(err);
	});
});

module.exports.app = app;