const fs = require('fs');

// let promise = fs.promises.readFile("example.txt");

// promise.then(function(contents) {
//   console.log(contents);
// }, function(err) {
//   console.error(err.message);
// });

// function readFile(filename) {
//   return new Promise(function(resolve, reject) {
//     fs.readFile(filename, {encoding: "utf8"}, function(err, contents) {
//       if (err) {
//         reject(err);
//         return;
//       }

//       resolve(contents);
//     });
//   });
// }

// let promise = readFile("example.txt");

// promise.then(function(contents) {
//   console.log(contents);
// }).catch(function(err) {
//   console.error(err.message);
// });

// let rejected;

// process.on("unhandledRejection", function(reason, promise) {
//   console.log(reason.message);
//   console.log(rejected === promise);
// });

// rejected = Promise.reject(new Error("Explosion"));

let rejected;

process.on("rejectionHandled", function(promise) {
  console.log(rejected === promise);
});

rejected = Promise.reject(new Error("Explosion"));

setTimeout(() => {
  rejected.catch(function(err) {
    console.log(err.message);
  });
}, 1000);