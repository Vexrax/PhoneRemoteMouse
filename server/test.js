const lib = require('lib');

lib.username.updateMouse['@']({x: 1, y: 10, time: 100}, function (err, result) {

  if (err) {
    // handle it
    console.log(err);
  }
  console.log("done");
  // do something with result

});