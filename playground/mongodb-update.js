const {MongoClient} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp",function(err,db){
	if(err){
		console.log("Unable to connect to Database..",err);
		return;
	}
	console.log("Successfully connected to Database TodoApp");
	var todos = db.collection("Todos");
	var users = db.collection("Users");

	users.findOneAndUpdate({name:"Rama"},{$set:{location:"Chennai"}},{returnOrginal:true}).then((result)=>{
		console.log(JSON.stringify(result,undefined,2));
	}).catch((err)=>{
		console.log(err);
	});

	db.close();
});