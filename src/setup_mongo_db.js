const mongoose = require('mongoose');

console.log(`Connecting to mongo db with connection string ${process.env.MONGODB_CONNECT}....`);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_CONNECT)
    .then(() => {
        console.log('Connection to mongo db succeeded');
    })
    .catch((e) => {
        console.log('Connection to mongo db failed!!');
        console.error(e);
    });