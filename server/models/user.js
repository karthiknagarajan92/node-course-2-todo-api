var mongoose = require("mongoose");
var Schema =  mongoose.Schema;

var userSchema = new Schema({
	name:{
		type:String,
		required:true,
	},
	email:{
		type:String,
		required:true,
		trim:true,
		minLength:1
	}
});

var User = mongoose.model("User",userSchema);

module.exports.User = User;