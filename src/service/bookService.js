const bookModel = require("../../src/model/book.model");

class bookService{
    bookModel;

    constructor(){
        this.bookModel = bookModel;
    }
    async getBooks(){
        return await this.bookModel.getAllBooks();
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
        // console.log(id);
        await this.bookModel.deleteBooks(id);
    }
    async addBook(req, res){
        const bookData = {
            name: req.body.name,
            publisher_id: req.body.publisher_id,
            author_id: req.body.author_id,
            category_id: req.body.category_id,
            price: req.body.price,
            publication_year: req.body.publication_year,
            number_of_publication: req.body.number_of_publication
        };
        await this.bookModel.addBook(bookData);
    }

    async getBookById(id) {
        return await this.bookModel.getBookById(id);
    }
    async editBook(id, bookData) {
        await this.bookModel.editBook(id, bookData);
    }

}

module.exports = new bookService();