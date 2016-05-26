// web.js
var express = require("express");
var logfmt = require("logfmt");
var app = express();  
//Se establese el directorio donde se encuentra los archivos estáticos
 app.use(express.static(__dirname + '/app'));     
              


app.get('/', function(req, res) {
  res.sendfile(__dirname + 'index.html');
});


//app.use(express.methodOverride());  

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});