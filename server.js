//Import Modules
const express = require('express');

//Create app 
const app = express();

//Pug
app.set('view engine', 'pug');
app.set('views','./views');

//Middlewares
app.use(express.static('css'));
app.use('/store', function(req, res, next){
    console.log('Jestem pośrednikiem przy żądaniu do /store');
    next();
});

//ROUTES
app.get('/', function (req, res) {
    res.send('Witaj Wędrowcze!');
});

app.get('/store', function (req, res) {
    res.send('To jest sklep');
});

app.get('/first-template', function(req, res){
    res.render('first-template');
});

app.get('/login', function(req, res){
    res.render('login', {
        name: "Zadanie z puga",
        style: "/style.css",
        url: "http://localhost:3000/auth/google",
        method: "GET"
    });
});

app.get('/auth/google', function(req, res) {
    res.render('auth', {
        name: "Zalogowany",
        login: req.query.login,
        password: req.query.password,
        style: "/auth.css"
    });
});

//Listening on PORT
app.listen(3000);
app.use(function (req, res, next) {
    res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!')
});