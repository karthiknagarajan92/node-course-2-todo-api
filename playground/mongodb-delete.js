const {MongoClient} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp",function(err,db){
	if(err){
		console.log("Unable to connect to Database..",err);
		return;
	}
	console.log("Successfully connected to Database TodoApp");
	var todos = db.collection("Todos");
	var users = db.collection("Users");

	// todos.deleteMany({text:"Buy a new smartphone"}).then((result)=>{
	// 	console.log(result);
	// }).catch((error)=>{
	// 	console.log("Error...",error);
	// });
	// db.close();

	users.findOneAndDelete({name:"Karthik"}).then((result)=>{
		console.log(result);
	}).catch((err)=>{
		console.log(err);
	});
});