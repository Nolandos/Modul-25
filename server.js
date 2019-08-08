//Import Modules
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('./config');

//Login session
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

//Create app 
const app = express();
let googleProfile = {};

//Passport configuration authorization request
passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret:config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.CALLBACK_URL
},
function(accessToken, refreshToken, profile, cb) {
    googleProfile = {
        id: profile.id,
        displayName: profile.displayName
    };
    cb(null, profile);
}
));

//Pug
app.set('view engine', 'pug');
app.set('views','./views');

//Middlewares
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('css'));
app.use('/store', function(req, res, next){
    console.log('Jestem pośrednikiem przy żądaniu do /store');
    next();
});

//ROUTES
app.get('/', function (req, res) {
    res.render('index', {
        url: "http://localhost:3000/auth/google",
        user: req.user
    });
});

app.get('/logged', function(req, res){
    res.render('logged', { user: googleProfile });
});

//Passport routes
app.get('/auth/google',
passport.authenticate('google', {
scope : ['profile', 'email']
}));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect : '/logged',
        failureRedirect: '/'
    }));

//Listening on PORT
app.listen(3000);
app.use(function (req, res, next) {
    res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!')
});