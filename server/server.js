var express = require("express");
var {ObjectID} = require("mongodb");
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

app.get("/todos",function(req,res){
	Todo.find().then((todos)=>{
		res.send({todos:todos});
	}).catch((err)=>{
		res.status(400);
		res.send(err);
	});
});

app.get("/todos/:id",(req,res)=>{
	if(!ObjectID.isValid(req.params.id)){
		return res.status(404).send("Invalid ID");
	}
		Todo.findById(req.params.id).then((doc)=>{
			if(!doc){
				return res.status(404).send();
			}
			res.send(doc);
		}).catch((e)=>{
			res.status(400);
			res.send(e);
		});
});
module.exports.app = app;