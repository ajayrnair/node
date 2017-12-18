const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
    new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
        },
        function(username, password, done) {
            try {
                console.log(`${username}:${password}`);
                if (username === 'ajay.r.nair@gmail.com' && password === 'test') {
                    //Login succeeded, user = user object
                    done(null, { name: 'Ajay', id: '1' });
                } else {
                    //Login failed, user = false
                    done(null, false);
                }
            } catch (e) {
                //Runtime error, first param = error
                done(e);
            }
        }
    )
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    if (id == 1) {
        done(null, { name: 'Ajay', id: '1' });
    } else {
        done({ msg: 'User not found!' });
    }
});

module.exports.isAuthenticated = (req, resp, next) => {
    if (req.isAuthenticated()) {
        next();
        return;
    }
    resp.redirect('/login');
};

module.exports.login = passport.authenticate('local', {
    successRedirect: '/express',
    failureRedirect: '/login'
});