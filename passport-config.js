const LocalStrategy = require('passport-local').Strategy
const User = require('./models/User');
const md5 = require('md5');

function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        User.findOne({ where: { email: email,password: md5(password) } })
        .then(function (user) {
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.password === password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        }).catch(err => done(err));
    }
    passport.use(new LocalStrategy({ usernameField: 'email',passwordField: 'password' }, authenticateUser))
    passport.serializeUser(function (user, done) {
        return done(null, user.id);
    })
    passport.deserializeUser(function (id, done) {
        User.findByPk(id).then((user) => {
            return done(null, user);
        });
    })
}
module.exports = initialize;