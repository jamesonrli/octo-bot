var restify = require('restify');
var fs = require('fs');

var controllers = {};
var controllers_path = process.cwd() + '/controllers'
  fs.readdirSync(controllers_path).forEach(function (file) {
    if (file.indexOf('.js') != -1) {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
    }
});

var server = restify.createServer();

server.use(restify.fullResponse());
server.use(restify.bodyParser());

// start textprocessor
server.put("/textprocessor", controllers.textprocessor.processText);
// end textprocessor

var port = process.env.PORT || 5050;
server.listen(port, function (err) {
  if (err) {
    console.error(err)
  }
  else {
    console.log('App is ready at : ' + port)
  }
});

if(process.env.environment == 'production') {
  process.on('uncaughtException', function (err) {
    console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)))
  });
}
