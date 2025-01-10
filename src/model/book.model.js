const { name } = require('ejs');
const DBConnect = require('./db');

class BookModel{
    connection;

    constructor(){
        this.connection = DBConnect.connect();
    }

    async getAllBooks(){
        const sql = `
            select book.*, book.name as book_name, author.name as author_name
            from book
            inner join author on book.author_id = author.id
            order by book.id;    
        `;
        const [results] = await (await this.connection).query(sql);
        return results;
    }
    async deleteBooks(id){
        const sql = 'DELETE FROM book WHERE id = ?';
        await (await this.connection).query(sql, [id]);
    }
    async addBook(book){
        const sql = 
        `
            insert into book (name, publisher_id, author_id, category_id, price, publication_year, number_of_publication)
            value (?, ?, ?, ?, ?, ?, ?);
        `;
        await (await this.connection).query(sql, [
            book.name,
            book.publisher_id,
            book.author_id,
            book.category_id,
            book.price,
            book.publication_year,
            book.number_of_publication
        ]);
    }

    async getBookById(id) {
        const sql = 'SELECT * FROM book WHERE id = ?';
        const [result] = await (await this.connection).query(sql, [id]);
        return result[0];
    }
    async updateBook(id, bookData) {
        const sql = `
            UPDATE book
            SET name = ?, publisher_id = ?, author_id = ?, category_id = ?, price = ?, publication_year = ?, number_of_publication = ?
            WHERE id = ?;
        `;
        await (await this.connection).query(sql, [
            bookData.name,
            bookData.publisher_id,
            bookData.author_id,
            bookData.category_id,
            bookData.price,
            bookData.publication_year,
            bookData.number_of_publication,
            id
        ]);
    }
    
}

module.exports = new BookModel();