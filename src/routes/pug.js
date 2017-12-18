const express = require('express');
const router = express.Router();
const pugController = require('../controllers/pug_controller');
const fileupload = require('express-fileupload');
const multer = require('multer');

const multipartData = multer({
    storage: multer.memoryStorage()
});

router.get('/', (req, resp) => {
    resp.send("Welcome to pug");
});

router.get('/inheritance', (req, resp) => {
    resp.render('inheritance');
});

router.get('/queryDump', (req, resp) => {
    /*
        Passing data to templates, pug iteration and js execution
    */
    resp.render('query_dump', {
        queryData: req.query
    })
});

router.get('/fileUpload', (req, resp) => {
    /*
        Using form submit
    */
    resp.render('form_upload');
});

//Post of form submit with file & example of middleware in route handling
//IMPORTANT: if self middleware is used, always call next(). Signature of middleware fn(req, res, next)
router.post('/fileUpload', fileupload(), (req, resp) => {
    /*
    fileupload() above is a middleware that runs before our actual route handler
    It appends data for each file uploaded (multiple supported) into req.files.<name attribute of input type = file>
    Each of the file has name, mimetype, and a buffer which is the data of the file
    Use mimetype to filter files since name can be modified by user to anything
    */
    resp.json(req.files)
});

router.get('/ajaxUpload', (req, resp) => {
    /*
        Ajax based upload
    */
    resp.render('ajax_upload');
});

router.post('/ajaxUpload', multipartData.any(), (req, resp) => {
    console.log(req.files);
    resp.status(404);
    resp.send('Ok');
});

module.exports = router;