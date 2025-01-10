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
            res.render('books/create')
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
            const bookId = req.params.id;
            const book = await this.bookService.getBookById(bookId);
            res.render('books/edit', { book });
        } catch (error) {
            console.log(error);
            res.status(500).send('There was an error while fetching the book data.');
        }
    }
    async editBook(req, res) {
        try {
            const bookId = req.params.id;
            const updatedBook = {
                name: req.body.name,
                publisher_id: req.body.publisher_id,
                author_id: req.body.author_id,
                category_id: req.body.category_id,
                price: req.body.price,
                publication_year: req.body.publication_year,
                number_of_publication: req.body.number_of_publication
            };
            await this.bookService.updateBook(bookId, updatedBook);
            res.redirect('/admin/books');
        } catch (error) {
            console.log(error);
            res.status(500).send('There was an error updating the book.');
        }
    }
    async showDetailForm(req, res){
        try {
            const bookId = req.params.id;
            const book = await this.bookService.getBookById(bookId);
            res.render('books/detail', { book })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new bookController();