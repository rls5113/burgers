// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function to translate column values for insert statement, derived from
// chapter 14, lesson 17. no need to reinvent the wheel.

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax used in update function
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.  Pass in the table name and callback function to receive
// the input
var orm = {
  selectAll: (tablename, cb) => {
    var queryString = "SELECT * FROM " + tablename + ";";
    connection.query(queryString, (err, result) => {
      if (err)     throw err;
      cb(result);
    });
  },
  insertOne: (tablename, cols, vals, cb) => {
    var queryString = "INSERT INTO " + tablename +
        "("+cols.toString()+")values("+printQuestionMarks(vals.length)+")";
        console.log(queryString);

        connection.query(queryString, vals, (err, result) => {
          if (err)     throw err;
          cb(result);
        });

  },
  updateOne: (tablename, keyvalues, condition, cb) => {
    var queryString = "update "+tablename+" set "+objToSql(keyvalues)+" where "+condition;
    console.log(queryString);
    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }
      cb(result);
    });
},
  // create: (tablename, cols, vals, cb) => {
  //   var queryString = "INSERT INTO " + tablename;

  //   queryString += " (";
  //   queryString += cols.toString();
  //   queryString += ") ";
  //   queryString += "VALUES (";
  //   queryString += printQuestionMarks(vals.length);
  //   queryString += ") ";

  //   console.log(queryString);

  //   connection.query(queryString, vals, (err, result) => {
  //     if (err)     throw err;
  //     cb(result);
  //   });
  // },
  // An example of objColVals would be {column1: value1, column2: value2,...}
  // update: (tablename, objColVals, condition, cb) => {
  //   var queryString = "UPDATE " + tablename;

  //   queryString += " SET ";
  //   queryString += objToSql(objColVals);
  //   queryString += " WHERE ";
  //   queryString += condition;

  //   console.log(queryString);
  //   connection.query(queryString, (err, result) => {
  //     if (err) {
  //       throw err;
  //     }
  //     cb(result);
  //   });
  // },
  delete: (tablename, condition, cb) => {
    var queryString = "DELETE FROM " + tablename;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

// Export the orm object for the model (cat.js).
module.exports = orm;
