const assert = require("assert");
const TestObject = require("../models/schema");

describe("demo tests", function () {
  it("adds two numbers together", function () {
    assert(2 + 3 === 5); // much like javascript, if the equation in the brackets is true the test will pass, otherwise it will fail
  });
});

describe("save data to the database", function () {
  it("saves a record to the database", function (done) {
    // done is a mocha function which is passed in as a parameter and invoked when the test is complete so Mocha can track when the test is finished
    const test = new TestObject({ name: "Carl" });
    test
      .save() // Mocha will save the test object into the database under the collection speficied in the schema
      .then(function () {
        // save is async mongoose auto implements promises
        assert(test.isNew === false); //test.isNew will fail because if the operation completes successfully this record has been added to the DB and is therefore not new
        done();
      });
  });
});

describe("Finding records", function () {
  let test;
  beforeEach(function (done) {
    test = new TestObject({ name: "Carl" });
    test.save().then(function () {
      done();
    });
  });

  it("finds a record in the database", function (done) {
    TestObject.findOne({ name: "Carl" }) // findOne is a method used on the model, not the instance
      .then(function (result) {
        assert(result.name === "Carl");
        done();
      });
  });
  it("finds a record by ID from the database", function (done) {
    TestObject.findOne({ _id: test._id }).then(function (result) {
      assert(result._id.toString() === test._id.toString()); // must have the toString method as ID is generated as Object
      done();
    });
  });
});

// test.delete() deletes single instance
// TestObject.delete() deletes ALL matching constructor objects
// TestObject.findOneAndDelete() deletes find and deletes a specific constructor object

describe("Deleting records", function () {
  let test;
  beforeEach(function (done) {
    test = new TestObject({ name: "Carl" });
    test.save().then(function () {
      done();
    });
  });

  it("Deletes a record in the database", function (done) {
    TestObject.findOneAndRemove({ name: "Carl" }).then(function () {
      // funds record and removes
      TestObject.findOne({ name: "Carl" }).then(function (result) {
        // attempts to find deleted record
        assert(result === null); // if null is returned, record has been successfully deleted
        done();
      });
    });
  });
});

describe("Updating records", function () {
  let test;
  beforeEach(function (done) {
    test = new TestObject({ name: "Carl", age: 100 });
    test.save().then(function () {
      done();
    });
  });

  it("Updates a record in the database", function (done) {
    TestObject.findOneAndUpdate({ name: "Carl" }, { name: "Carlos" }).then(
      //update method takes two arguments, the first is the record to update, the second is what to update the found record to
      function () {
        TestObject.findOne({ _id: test._id }).then(function (result) {
          // we then use the findOne method to find the new record
          assert(result.name === "Carlos");
          done();
        });
      }
    );
  });
  it("Increments the age of all constructor objects by one", function (done) {
    // because we are updating the constructor objects, we can pass in an empty object to return all records
    TestObject.updateMany({}, { $inc: { age: 1 } }).then(function () {
      // $inc is the increment operator, we pass in an object and specify which key to update and how much by. More operators in the docs.
      TestObject.findOne({ name: "Carl" }).then(function (result) {
        assert(result.age === 101);
        done();
      });
    });
  });
});

// increment operator
