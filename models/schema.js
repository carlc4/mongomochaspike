const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestSchema = new Schema({
  // a schema is a template that we expect database objects to adhere to
  name: String, // however they do NOT have to contain all fields, but the fields they do contain should adhere to the rules
  age: Number,
});

const TestObject = mongoose.model("testobject", TestSchema); // this assigns the schema we just created to the TestObject

module.exports = TestObject;

// const newThing = new TestObject this is the useage in the rest of our app
