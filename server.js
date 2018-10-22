const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const download = require('image-downloader')
const axios = require('axios')
const firebase = require('firebase')
const spawn = require("child_process").spawn;


const app = express()

// HBS setup
const hbs = require('express-handlebars')({
  extname: '.hbs'
});

app.engine('hbs', hbs);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.render('final_home')
})

app.post('/filter', async function(req, res) {
    const url = req.body.url
    const name = req.body.name
    const image = await axios.get(url)

    await download.image({url: url, dest: `./python_methods/${name}`}).then(({filename, image}) => {
        console.log('File saved to', filename)
    })
    .catch((err) => {
        console.error(err)
    })

    const pythonProcess = spawn('python',["./python_methods/image_sizer.py"]);

    pythonProcess.stdout.on('data', (data) => {
        console.log(data.toString());
    });


});


app.listen(3000, function(err) {
    if(err) {
        console.log('There was an error');
    } else {
        console.log('We are live on 3000 :)');
    }

})
