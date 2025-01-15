const DBConnect = require('./db');

class BookModel{
    connection;

    constructor(){
        this.connection = DBConnect.connect();
    }

    async getAllBooks(page = 1, limit = 5){
        const offset = (page - 1) * limit;
        const sql = `
            select book.*, book.name as book_name,author.name as author_name, publisher.name as publisher_name, category.name as category_name
            from book	
            inner join author on book.author_id = author.id
            inner join publisher on book.publisher_id = publisher.id
            inner join category on book.category_id = category.id
            order by id ASC
            LIMIT ? OFFSET ?;  
        `;
        const [results] = await (await this.connection).query(sql, [limit, offset]);
        
        const countSql = 'SELECT COUNT(*) AS total FROM book';
        const [countResult] = await (await this.connection).query(countSql);
        const totalBooks = countResult[0].total;

        return {
            books: results,
            totalBooks,
            totalPages: Math.ceil(totalBooks / limit)
        };
    }
    
    async deleteBooks(id){
        const sql = 'DELETE FROM book WHERE id = ?';
        await (await this.connection).query(sql, [id]);
    }
    async addBook(data){
        const sql = 
        `
            insert into book (name, publisher_id, author_id, category_id, price, image, publication_year, number_of_publication)
            value (?, ?, ?, ?, ?, ?, ?, ?);
        `;
        const {name, publisher_id, author_id, category_id, price, image, publication_year, number_of_publication} = data
        return await (await this.connection).query(sql, [
            name,
            publisher_id,
            author_id,
            category_id,
            price,
            image,
            publication_year,
            number_of_publication
        ]);   
    }

    async getBookById(id) {
        const sql = 'SELECT * FROM book WHERE id = ?';
        const [result] = await (await this.connection).query(sql, [id]);
        return result[0];
    }
    async getAllAuthor(req, res){
        const sql = 'SELECT * FROM author';
        const [results] = await (await this.connection).query(sql);
        return results;
    }
    async getAllPublisher(req, res){
        const sql = 'SELECT * FROM publisher';
        const [results] = await (await this.connection).query(sql);
        return results;
    }
    async getAllCategory(req, res){
        const sql = 'SELECT * FROM category';
        const [results] = await (await this.connection).query(sql);
        return results;
    }
    async editBook(id, bookData) {
        const sql = `
            UPDATE book
            SET 
                name = ?, 
                publisher_id = ?, 
                author_id = ?, 
                category_id = ?, 
                price = ?,
                image = ?, 
                publication_year = ?, 
                number_of_publication = ?
            WHERE id = ?;
        `;
        const {name, publisher_id, author_id, category_id, price, image, publication_year, number_of_publication} = bookData
        return await (await this.connection).query(sql, [
            name,
            publisher_id,
            author_id,
            category_id,
            price,
            image,
            publication_year,
            number_of_publication,
            id
        ]);   
    }
    
}

module.exports = new BookModel();