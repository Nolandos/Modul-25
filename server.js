//Import Modules
const express = require('express');
const bodyParser = require('body-parser');
var fs = require('fs');

//Create app 
const app = express();
let stringifyFile;

//Middlewares
app.use(bodyParser.json());
app.use(express.static('assets'));

//ROUTES
app.get('/', (req, res) => {
    res.sendFile('/index.html');
});

app.get('/userform', function (req, res) {
    const response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name
    };
    res.json(response);
});


//Listening on PORT
var server = app.listen(3000, 'localhost', function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Przykładowa aplikacja nasłuchuje na http://' + host + ':' + port);
});