const express = require('express')
const router = express.Router()

const homeController = require('../controller/homeController');
const authController = require('../controller/authController');

router.get('/home', (req, res)=>{
    homeController.showHomePage(req, res)
})
router.get('/login', (req, res)=>{
    authController.showFormLogin(req, res);
})

router.post('/login', (req, res)=>{
    authController.login(req, res);
})

router.get('/register', (req, res)=>{
    authController.showFormRegister(req, res);
})
router.post('/register', (req, res)=>{
    authController.register(req, res);
})


module.exports = router;