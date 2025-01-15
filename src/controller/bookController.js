const bookService = require('../service/bookService');

class bookController{
    bookService;
    constructor(){
        this.bookService = bookService;
    }
    async showlistBook(req, res){
        const books = await this.bookService.getBooks();
        // console.log(books);
        res.render('books/list', {data: books});
    }
    async deleteBook(req, res){
        try{
            await this.bookService.deleteBooksById(req, res);
        }catch(e){
            console.log(e);
        }
        res.redirect('/admin/books');
    }
    async showCreateForm(req, res){
        try {
            const authors = await this.bookService.getAuthors();
            const publishers = await this.bookService.getPublishers();
            const categories = await this.bookService.getCategories();
            res.render('books/create', {authors, publishers, categories})
        } catch (error) {
            console.log(error)
        }
    }
    async createBook(req, res){
        try {
            await this.bookService.addBook(req, res);
            res.redirect('/admin/books');
        } catch (error) {
            console.log(error)
            res.status(500).send('There was an error while adding the book.');
        }
    }
    async showEditForm(req, res) {
        try {
            const authors = await this.bookService.getAuthors();
            const publishers = await this.bookService.getPublishers();
            const categories = await this.bookService.getCategories();
            const bookId = req.params.id;
            const book = await this.bookService.getBookById(bookId);
            res.render('books/edit', { book, authors, publishers, categories });
        } catch (error) {
            console.log(error);
            res.status(500).send('There was an error while fetching the book data.');
        }
    }
    async editBook(req, res) {
        try {
            await this.bookService.editBook(req, res);
            res.redirect('/admin/books');
        } catch (error) {
            console.log(error);
            res.status(500).send('There was an error updating the book.');
        }
    }
    async showDetailForm(req, res){
        try {
            const authors = await this.bookService.getAuthors();
            const publishers = await this.bookService.getPublishers();
            const categories = await this.bookService.getCategories();
            const bookId = req.params.id;
            const book = await this.bookService.getBookById(bookId);

            const author = authors.find(a => a.id === book.author_id);
            const category = categories.find(b => b.id === book.category_id);
            const publisher = publishers.find(c => c.id === book.publisher_id);
            res.render('books/detail', { book, author, publisher, category })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new bookController();