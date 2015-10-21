var https = require('https');
var http = require('http');

exports.getResponseJSON = function() {
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

      sendResultGroupMe(resultText);
      sendResultGroupMe(resultGif);
    });
  });

  reqGet.end();
  reqGet.on('error', function(e) {
    console.error("failed to get yesno");
  });
};

function sendResultGroupMe(result) {
  var postOptions = {
    host: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  // groupme does not provide response on success
  var reqPost = https.request(postOptions);

  reqPost.write(JSON.stringify(result));
  reqPost.end();
  reqPost.on('error', function(e) {
    console.error("failed to post to groupme: " + e);
  })
};
