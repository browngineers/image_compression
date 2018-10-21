const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const app = express()








// HBS setup
const hbs = require('express-handlebars')({
  extname: '.html'
});

app.engine('html', hbs);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.render('final_home')
})

app.post('/upload', function(req, res) {
  console.log(req.files); // the uploaded file object
});


app.listen(3000, function(err) {
    if(err) {
        console.log('There was an error');
    } else {
        console.log('We are live on 3000 :)');
    }

})
