const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const download = require('image-downloader')
const fs = require('fs')
const firebase = require('firebase')
const spawn = require("child_process").spawn;


const app = express()







// HBS setup
const hbs = require('express-handlebars')({
  extname: '.html'
});

app.engine('html', hbs);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.render('final_home')
})

app.post('/filter', async function(req, res) {
    const url = req.body.url
    const name = req.body.name

    await download.image({url: url, dest: `./${name}`}).then(({filename, image}) => {
        console.log('File saved to', filename)
    })
    .catch((err) => {
        console.error(err)
    })
    const pythonProcess = await spawn('python',["./image_sizer.py"]);

    res.sendStatus(200)
});

app.get('/download', async function(req, res) {
    const name = req.query.name
    const newImage = `./BW_${name}`
    res.download(newImage)
})


app.listen(3000, function(err) {
    if(err) {
        console.log('There was an error');
    } else {
        console.log('We are live on 3000 :)');
    }

})
