var express = require('express');
var app = express();

var PORT = process.env.PORT || 3000;
app.get('/', function (req, res){
    res.send('Hello world');
});

app.listen(PORT, function (err){
    console.log('Server is running on ' + PORT);
});


