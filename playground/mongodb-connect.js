const mongoClient = require("mongodb").MongoClient;

mongoClient.connect("mongodb://localhost:27017/TodoApp",(err,db)=>{
	if(err){
		console.log("Unable to connect to MongoDb Server",err);
		return;
	}
	console.log("Connected to MongoDB");

	var todos = db.collection("Todos");
	var users = db.collection("Users");

	// todos.insertOne({
	// 	text:"To do something",
	// 	completed:false
	// 	},(err,result)=>{
	// 		if(err){
	// 			console.log("Unable to add new note to DB",err);
	// 			return;
	// 		}
	// 		console.log(JSON.stringify(result.ops,undefined,2));

	// });

	users.insertOne({
		name:"Karthik",
		age:24,
		location:"Chennai"
		},function(err,result){
			if(err){
				console.log("Unable to add new user to collection",err);
				return;
			}
			console.log(JSON.stringify(result.ops,undefined,2));

	});

	db.close();

});