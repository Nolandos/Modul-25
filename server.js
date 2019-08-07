//Import Modules
const express = require('express');
const bodyParser = require('body-parser');

//Create app 
const app = express();

//Middlewares
app.use(bodyParser.json());
app.use('/store', function(req, res, next){
    console.log('Jestem pośrednikiem przy żądaniu do /store');
    next();
});

//ROUTES
app.get('/', (req, res) => {
    res.send('Witaj Wędrowcze');
});

app.get('/store', function (req, res) {
    res.send('To jest sklep');
});

//Listening on PORT
let server = app.listen(3000, 'localhost', function() {
    let host = server.address().address;
    let port = server.address().port;

    console.log('Przykładowa aplikacja nasłuchuje na http://' + host + ':' + port);
});
app.use(function (req, res, next) {
    res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!')
});
