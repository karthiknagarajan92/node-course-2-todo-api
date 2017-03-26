const expect = require("expect");
const request = require("supertest");

var {app}=require("./../server.js");
var {Todo}=require("./../models/todo.js");

var todosArray = [{
						text:"First todo"
					},
					{
						text:"second todo"
					}];

beforeEach((done)=>{
	Todo.remove().then(()=>{
		return Todo.insertMany(todosArray);
	}).then(()=>{
		done();
	});
});

describe("POST/todo test",()=>{
	it("should create a new todo",(done)=>{ //adding done since its a async test
		var text = "This is a test string1";
		request(app)
			.post("/todos")
			.send({text:text})
			.expect(200)
			.expect(function(res){
				expect(res.body.text).toBe(text);
			})
			.end(function(err,res){
				if(err){
					return done(err);
				}
				Todo.find().then((todos)=>{
					expect(todos.length).toBe(todosArray.length +1); //just for one insert alone
					//expect(todos[0].text).toBe(text);
					done();
				}).catch((err)=>{
					done(err);
				});
			});
		}); //end of first it

	it("should not create a new todo",(done)=>{
		request(app)
		.post("/todos")
		.send({})
		.expect(400)
		.end((err,res)=>{
			if(err){
				return done(err);
			}
			Todo.find().then((todos)=>{
				expect(todos.length).toBe(todosArray.length);
				done();
			}).catch((err)=>{
				done(err);
			});
		});
	});
});  //end of first describe

describe("GET/todos",()=>{
	it("should get all todos",(done)=>{
		request(app)
		.get("/todos")
		.expect(200)
		.expect((res)=>{
			console.log(res.body);
			expect(res.body.todos.length).toBe(2);
		})
		.end(done)
	});
});


