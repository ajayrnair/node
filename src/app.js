const express = require('express');
const path = require('path');
require('dotenv').config({
    path: './development.env'
});
require('./setup_mongo_db');
const userRoutes = require('./routes/user');
const itemRouter = require('./routes/items');

//Create app
const app = express();

//Setup Pug view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

/*
    Setup all the middleware before setting routes & error handling
    Order of middleware matters! Request goes through them in order
    First middleware is for getting global access to some data in views
    eg: user data, request params etc
*/
app.use((req, resp, next) => {
    resp.locals.defaultName = 'Ajay';
    next(); //Do not forget to call next on self written middleware
});


//Setup routes
app.use('/user', userRoutes);
app.use('/item', itemRouter);

//Path not found handler, since none of the routes handled it till here
app.use((req, resp, next) => {
    resp.send('Could not find any path...');
});

//Global error handler. 4 arguments (function.length) marks it as an error handler
app.use((error, req, resp, next) => {
    resp.send('Oops! Error!');
});

//Start server
app.listen(8080, () => {
    console.log('Application started');
}).on('error', (e) => {
    console.log('Error starting server');
    console.error(e);
});;