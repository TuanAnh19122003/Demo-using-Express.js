const bookModel = require("../../src/model/book.model");
const fs = require('fs');

class bookService{
    bookModel;

    constructor(){
        this.bookModel = bookModel;
    }
    async getBooks(page, limit) {
        return await this.bookModel.getAllBooks(page, limit);
    }
    
    async getAuthors(){
        return await this.bookModel.getAllAuthor();
    }
    async getCategories(){
        return await this.bookModel.getAllCategory();
    }
    async getPublishers(){
        return await this.bookModel.getAllPublisher();
    }
    async deleteBooksById(req, res){
        const id = req.params.id;
        await this.deleteImageOfBook(id);
        await this.bookModel.deleteBooks(id);
    }
    async deleteImageOfBook(id) {
        const book = await this.bookModel.getBookById(id);
        const imagePath = "./public/uploads/" + book.image;
        await this.unlinkFile(imagePath);
    }
    unlinkFile(filePath) {
        const promise = new Promise((resolve, reject) => {
            fs.unlink(filePath, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        return promise;
   }
    async addBook(req, res){
        try {
            const bookData = req.body;
            const image = req.file;
            const nameFile = image.filename;
            bookData.image = nameFile;
            // console.log(image)
            await this.bookModel.addBook(bookData);
        } catch (error) {
            console.log(err.message);
        }
    }

    async getBookById(id) {
        return await this.bookModel.getBookById(id);
    }
    async editBook(req, res) {
        try {
            const {id} = req.params;
            const bookUpdate = await this.getBookById(id);
            const bookData = req.body;

            if(req.file){
                const image = req.file;
                const nameFile = image.filename;
                bookData.image = nameFile;
                
                const pathImage = "public/uploads/" + bookUpdate.image;
                if(bookUpdate.image){
                    await this.unlinkFile(pathImage);
                }
               
            }else{
                bookData.image = bookUpdate.image;
            }
            
            await this.bookModel.editBook(id, bookData);

        } catch (error) {
            console.log(error.message);
        }
    }

}

module.exports = new bookService();