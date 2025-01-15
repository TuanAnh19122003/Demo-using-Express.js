const express = require('express')
const multer  = require('multer')
const router = express.Router()

const homeController = require('../controller/homeController');
const authController = require('../controller/authController');
const studentController = require('../controller/bookController');
const bookController = require('../controller/bookController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    },
});

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

router.get('/admin/books', (req, res)=>{
    bookController.showlistBook(req, res);
})

router.get('/admin/books/:id/delete', (req, res)=>{
    bookController.deleteBook(req, res);
})
router.get('/admin/books/create', (req, res)=>{
    bookController.showCreateForm(req, res);
})
router.post('/admin/books/create', upload.single('image'), (req, res)=>{
    bookController.createBook(req, res);
})

router.get('/admin/books/:id/edit', (req, res) => {
    bookController.showEditForm(req, res);
});

router.post('/admin/books/:id/edit', upload.single('image'), (req, res) => {
    bookController.editBook(req, res);
});
router.get('/admin/books/:id/detail', (req, res) => {
    bookController.showDetailForm(req, res);
});

module.exports = router;