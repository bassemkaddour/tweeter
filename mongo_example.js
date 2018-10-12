"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI , (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  //connection to tweeter db
  // console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // function getTweets(callback) {
  //   db.collection("tweets").find().toArray((err, tweets) => {
  //     if (err) {
  //       return callback(err);
  //     }
  //     callback(null, tweets);
  //   });
  // }

  // don't need error handling above unless you are actuall going to do something useful with the errors
  function getTweets(callback) {
    db.collection("tweets").find().toArray(callback);
  }

  getTweets((err, tweets) => {
    if (err) throw err;

    console.log("Logging each tweet: ");
    for (let tweet of tweets) {
      console.log(tweet);
    }

    db.close();
  });

});




// MongoClient.connect(MONGODB_URI , (err, db) => {
//   if (err) {
//     console.error(`Failed to connect: ${MONGODB_URI}`);
//     throw err;
//   }
//   console.log(`Connected to mongodb: ${MONGODB_URI}`);

//   // db.collection("tweets").find({}, (err, results) => {
//   db.collection("tweets").find().toArray((err, results) => {

//     if (err) throw err;

//     console.log("results array: ", results);

//     // results.each((err, item ) => console.log(" ", item));

//     // results.toArray((err, resultsArray) => {
//     //   if (err) throw err;

//     //   console.log("results.toArray", resultsArray);
//     // });

//     db.close();

//   });
// });


