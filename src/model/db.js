const mysql = require("mysql2/promise");

class DBConnect{
    host;
    port;
    user;
    database;
    password;

    constructor(){
        this.host = 'localhost';
        this.port = '3306';
        this.user = 'root';
        this.database = 'book_management';
        this.password = '123456';
    }

    async connect(){
        let conn = null;
        try{
            conn = await mysql.createConnection({
                host: this.host,
                user:this.user,
                database: this.database,
                port: this.port,
                password: this.password
            });
            console.log('Connect to DB');
        }catch(e){
            console.log(e);
            throw new Error("Can't connect to db");
        }
        return conn;
    }
}

module.exports = new DBConnect();