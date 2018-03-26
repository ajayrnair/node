const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
//Read a file and make it available on the process.env as environment variable
require('dotenv').config({
    path: '../development.env'
});
const expressRoutes = require('./routes/express');
const pugRoutes = require('./routes/pug');
const authRoutes = require('./routes/auth');
const passport = require('passport');
const session = require('express-session');
const authController = require('./controllers/auth_controller');

//Create app
const app = express();

//Setup view engine to pug & views folder
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

/*
    Setting up passport to run on every request
*/
//Within the session parameters, we can set the cookie expiry
//https://www.npmjs.com/package/express-session, secure, httpOnly
app.use(session({ secret: 'ajay' }));
app.use(passport.initialize());
app.use(passport.session());

/*
    Setup all the middleware before setting routes & error handling
    Order of middleware matters! Request goes through them in order
    First middleware is for getting global access to some data in views
    eg: user data, request params etc
*/
app.use((req, resp, next) => {
    resp.locals.defaultAppName = 'Node & Pug';
    resp.locals.user = req.user;
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
app.use('/', authRoutes);
app.use('/express', authController.isAuthenticated, expressRoutes);
app.use('/pug', authController.isAuthenticated, pugRoutes);

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
    console.log('Application started on ' + process.env.PORT);
}).on('error', (e) => {
    console.log('Error starting server');
    console.error(e);
});;