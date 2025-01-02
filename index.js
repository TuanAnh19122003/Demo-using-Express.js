const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

const router = require('./src/routers/app.router')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
//config static file
app.use(express.static(path.join(__dirname, 'public')))

//config views engine
app.set('views', path.join(__dirname, './src/view'));
app.set('view engine', 'ejs');

//router
app.use(router)


app.listen(PORT, ()=>{
    console.log(`Server running at ${PORT}`);
})