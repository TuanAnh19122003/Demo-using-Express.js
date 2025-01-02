const e = require("express");

class authService{
    static findAcc(req, res){
        const { email, password } = req.body;
        return email == 'ABC12@gmail.com' && password == '123';
    }
    static registerAcc(req, res){
        const {email, password, confirmPassword} = req.body;
        if(!email){
            return res.status(400).json({ message: 'Phải đăng nhập email' });
        }else if(password !== confirmPassword){
            return res.status(400).json({ message:'Mật khẩu phải trùng nhau' })
        }else{
            return email, password
        }
    }
}

module.exports = authService;