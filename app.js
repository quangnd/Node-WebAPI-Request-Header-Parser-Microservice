var express = require('express');
var app = express();
var osModule = require('os');

var PORT = process.env.PORT || 3000;
app.get('/', function (req, res) {
    console.log(req.headers['accept-language']);
    console.log(req.headers['user-agent']);
    console.log(req.headers['x-forwarded-for']);

    //Find ip address use native module
    //!!NOTE!! We can use "ip" module at https://github.com/indutny/node-ip
    var interfaces = osModule.networkInterfaces();
    console.log(interfaces);
    var addresses = [];
    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }

    console.log(addresses);
    //end find ip

    var language = req.headers['accept-language'].split(',')[0];
    var os = req.headers['user-agent'].split(') ')[0].split(' (')[1];

    res.send({
        ip: addresses[0],
        language: language,
        software: os
    });
});

app.listen(PORT, function (err) {
    console.log('Server is running on ' + PORT);
});


