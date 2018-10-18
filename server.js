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

app.listen(3000, function(err) {
    if(err) {
        console.log('There was an error');
    } else {
        console.log('We are live on 3000 :)');
    }

})
