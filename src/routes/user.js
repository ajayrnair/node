const express = require('express');
const router = express.Router();

router.get('/', (req, resp) => {
    resp.send("User index route");
});

router.get('/query', (req, resp) => {
    resp.json(req.query);
});

router.get('/views/:name', (req, resp) => {
    console.log(resp.locals);
    resp.render('hello', {
        name: req.params.name
    });
});

router.get('/:name', (req, resp) => {
    resp.send(req.params.name);
});

module.exports = router;