var express = require('express');
var cors = require('cors');
require('dotenv').config()
let bodyParser = require('body-parser')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({extended: false}))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single("upfile"), (req, res)=>{

  let submitted_file = req.file

  res.json({
    name: submitted_file.originalname,
    type: submitted_file.mimetype,
    size: submitted_file.size
  })


})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
