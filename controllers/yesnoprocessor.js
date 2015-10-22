var http = require('http');

var GroupMe = require('./groupmeclient');
exports.getResponseJSON = function() {
  console.log("yesno matched preparing to send gif...");
  var getOptions = {
    host: 'yesno.wtf',
    path: '/api',
    method: 'GET'
  };

  var reqGet = http.request(getOptions, function(res) {
    var result = "";
    res.on('data', function(d) {
      result += d;
    });

    res.on('end', function() {
      var resultObj = JSON.parse(result);
      var resultText = {
        bot_id: process.env.bot_id,
        text: resultObj.answer,
      }
      var resultGif = {
        bot_id: process.env.bot_id,
        text: resultObj.image
      }

      GroupMe.sendResult(resultText);
      setTimeout(function() {
        GroupMe.sendResult(resultGif);
      }, 2000);

      console.log("yesno message sent");
    });
  });

  reqGet.end();
  reqGet.on('error', function(e) {
    console.error("failed to get yesno");
  });
};
