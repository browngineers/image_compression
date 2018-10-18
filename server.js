const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const app = express()


// HBS setup
const hbs = require('express-handlebars')({
  extname: '.hbs'
});

app.engine('hbs', hbs);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.render('iter_1')
})

app.get('/python-test', function(req, res) {
    // Use child_process.spawn method from
    // child_process module and assign it
    // to variable spawn
    const spawn = require("child_process").spawn;

    // Parameters passed in spawn -
    // 1. type_of_script
    // 2. list containing Path of the script
    //    and arguments for the script

    // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will
    // so, first name = Mike and last name = Will
    const process = spawn('python',["./python_methods/hello.py",
                            req.query.firstname,
                            req.query.lastname] );

    // Takes stdout data from script which executed
    // with arguments and send this data to res object
    process.stdout.on('data', function(data) {
        res.send(data.toString());
    } )
    }
})

app.listen(3000, function(err) {
    if(err) {
        console.log('There was an error');
    } else {
        console.log('We are live on 3000 :)');
    }

})
