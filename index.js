const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

const router = require('./src/routers/app.router')
const DBConnect = require('./src/model/db')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
//config static file
app.use(express.static(path.join(__dirname, 'public')))
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

//config views engine
app.set('views', path.join(__dirname, './src/view'));
app.set('view engine', 'ejs');

//router
app.use(router)
DBConnect.connect();

app.listen(PORT, ()=>{
    console.log(`Server running at ${PORT}`);
})