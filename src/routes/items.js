const express = require('express');
const router = express.Router();

router.get('/', (req, resp) => {
    resp.send('items index response');
})

module.exports = router;