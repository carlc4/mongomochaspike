const mongoose = require("mongoose");

// ES6 Promises - uncomment this is you get a depreceated warning when running tests
// mongoose.Promise = global.Promise;

// Connect to the DB before the tests run
before(function (done) {
  // the before function establishes the connection before the tests run
  mongoose.connect("ADD MONGO URI HERE");

  mongoose.connection
    .once("open", function () {
      console.log("Connection has been made..");
      done();
    })
    .on("error", function (error) {
      console.log("Connection error:", error);
    });
});

// instructs Mocha to drop the test collection before every test is run
beforeEach(function (done) {
  // Mongoose auto pluralises the collection we set up
  mongoose.connection.collections.testobjects.drop(function () {
    done();
  });
});
