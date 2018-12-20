var express = require('express');
var app = express();
var path = require('path');
var jsonServer = require('json-server');

var port = Number(process.env.PORT || 3000);

app.use('/api', jsonServer.router('db.json'));
app.use(express.static('build'));
app.use('/static', express.static('build/static'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(port, function() {
  console.log('JSON Server is running on port' + port);
});
