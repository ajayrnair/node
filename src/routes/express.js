const express = require('express');
const router = express.Router();

router.get('/', (req, resp) => {
    //Send back as a text response
    resp.send('Welcome to Express');
});

router.get('/queryEmitter', (req, resp) => {
    //Send a json response of the query parameters used to call this route
    resp.json(req.query);
});

router.get('/paramsEmitter/:param1', (req, resp) => {
    //Send a json response of the params in the route
    resp.json(req.params);
});

router.post('/formParams', (req, resp) => {
    //BodyParser is setup with enctype = urlencoded (default) and it makes form params available req.body
    //enctype is set with content type = application/x-www-form-urlencoded
    console.log(req.body);
    resp.json(req.body);
});

module.exports = router;