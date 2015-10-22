var https = require('https');

exports.sendResult = function(result) {
  console.log("sending message to groupme");
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
