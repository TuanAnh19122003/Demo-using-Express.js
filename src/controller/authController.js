const authService = require("../service/authService");

class authController{
    static showFormLogin(req, res){
        res.render('auth/login');
    }
    static login(req, res){
        if(authService.findAcc(req,res)){
            res.redirect('/home')
        }else{
            res.redirect('/login')
        }
    }
    
    static showFormRegister(req, res){
        res.render('auth/register')
    }
    static register(req, res){
        if(authService.registerAcc(req, res)){
            res.redirect('/login')
        }else{
            res.redirect('/register')
        }
    }
}

module.exports = authController;