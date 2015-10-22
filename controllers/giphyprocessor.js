var http = require('http');

var GroupMe = require('./groupmeclient');
exports.getResponseJSON = function(messageList) {
  messageList.splice(0, 1);
  var searchString = messageList.join("+") || "";
  console.log("giphy matched preparing to send gif... with search: " + searchString);
  var getOptions = {
    host: 'api.giphy.com',
    path: '/v1/gifs/search?q=' + searchString + '&api_key=dc6zaTOxFJmzC',
    method: 'GET'
  };

  var reqGet = http.request(getOptions, function(res) {
    var result = "";
    res.on('data', function(d) {
      result += d;
    });

    res.on('end', function() {
      var resultData = JSON.parse(result);
      if(resultData.data.length > 0) {
        var downsizedGifUrl = resultData.data[0].images.downsized.url;
        var resultGif = {
          bot_id: process.env.bot_id,
          text: downsizedGifUrl
        }

        GroupMe.sendResultGroupMe(resultGif);

        console.log("giphy message sent");
      }
    });
  });

  reqGet.end();
  reqGet.on('error', function(e) {
    console.error("failed to get giphy");
  });
};
