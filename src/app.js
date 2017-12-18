const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
//Read a file and make it available on the process.env as environment variable
require('dotenv').config({
    path: './development.env'
});
const expressRoutes = require('./routes/express');
const pugRoutes = require('./routes/pug');

//Create app
const app = express();

//Setup view engine to pug & views folder
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

/*
    Setup all the middleware before setting routes & error handling
    Order of middleware matters! Request goes through them in order
    First middleware is for getting global access to some data in views
    eg: user data, request params etc
*/
app.use((req, resp, next) => {
    resp.locals.defaultAppName = 'Node & Pug';
    next(); //Do not forget to call next on self written middleware
});

/*
    Set public folder
*/
const publicPath = path.join(__dirname, 'public');
app.use('/files', express.static(publicPath));

//Make request body variables available on request.body
app.use(bodyParser.urlencoded({
    extended: true
}));


//Setup routes
app.use('/express', expressRoutes);
app.use('/pug', pugRoutes);

//Path not found handler, since none of the routes handled it till here
app.use((req, resp, next) => {
    resp.status(404);
    resp.send('Could not find any path...');
});

//Global error handler. 4 arguments (function.length) marks it as an error handler
app.use((error, req, resp, next) => {
    console.log(error);
    resp.status(500);
    if (process.env.NODE_ENV === 'development') {
        resp.json(error);
    } else {
        resp.send('Oops! Error!');
    }
});

//Start server
app.listen(process.env.PORT, () => {
    console.log('Application started');
}).on('error', (e) => {
    console.log('Error starting server');
    console.error(e);
});;