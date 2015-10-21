
exports.processText = function(req, res, next) {
  if(req.headers['content-type'] != "application/json") {
    sendFail(res);
  }

  if(req.body) {
    var messageBody = req.body.text;
    var messageList = messageBody.split(" ");

    if(messageList.length > 0) {
      var command = messageList[0];
      var processor = findPossibleProcessor(command, messageList);

      if(processor) {
        res.status(200);
        res.send(JSON.stringify(processor.getResponseJSON()));
      } else {
        res.send("");
      }
    }
  } else {
    sendFail(res);
  }
};

function sendFail(res) {
  res.status(400);
  var response = {
    message: "json body required"
  };

  res.send(JSON.stringify(response));
};

var YesNoProcessor = require('./yesnoprocessor');
function findPossibleProcessor(command, messageList) {
  switch(command) {
    case "/yesno":
      return YesNoProcessor;
      break;
  }
};
