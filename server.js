//Import Modules
const experss = require('express');
const bodyParser = require('body-parser');
var fs = require('fs');

//Create app 
const app = experss();
let stringifyFile;

//Middlewares
app.use(bodyParser.json());

//ROUTES
app.get('/', (req, res) => {
    res.send('Siema');
});

app.get('/getNote', async (req, res) => {
    try {
        fs.readFile('./test.json', 'utf8', function(err, data) {
            if (err) throw err;
            stringifyFile = data
            res.send(data);
        });
    } catch(err) {
        res.send(err);
    }
});

app.post('/getNote/:note', async (req, res) => {
    try {
        stringifyFile += req.params.note;
        fs.writeFile('./test.json', stringifyFile, function(err) {
            if (err) throw err;
            console.log('file updated');
        });
    } catch(err) {
        res.send(err);
    }
})

//Listening on PORT
app.listen(3000);