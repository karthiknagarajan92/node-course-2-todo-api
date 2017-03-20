const {MongoClient} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp",function(err,db){
	if(err){
		console.log("Unable to connect with DB",err);
		return;
	}
	console.log("Successfully connected with database");
	var todos = db.collection("Todos");
	var users = db.collection("Users");

	//todos.find() retuns a cursor
	// todos.find().toArray() //retuns a promise
	// todos.find({completed:false}).toArray().then(function(docs){
	// 	console.log("Todos....");
	// 	console.log(JSON.stringify(docs,undefined,2));
	// }).catch(function(err){
	// 	console.log("Error...",err);
	// });

	todos.find().count().then(function(count){
		console.log("Todos count is ",count);
	}).catch(function(error){
		console.log("Error...",error);
	});

	users.find({name:"Karthik"}).toArray().then((docs)=>{
		console.log("Users...");
		console.log(JSON.stringify(docs,undefined,2));
	}).catch((err)=>{
		console.log("Error...",err);
	});


	db.close();
});
