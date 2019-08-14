// config/passport.js
const passport = require('passport')
// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model


// expose this function to our app using module.exports

// =========================================================================
// passport session setup ==================================================
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// used to serialize the user for the session
passport.serializeUser((user, done) => done(null, user.user_id));

// used to deserialize the user
passport.deserializeUser((id, done) => {
  database.query("SELECT * FROM v_user WHERE user_id = ? ", [id])
  .then(rows => done(null,rows[0]))
  .catch(err => done(err,null))
});

//Function to update last_login
function updateLastLogin(userId){
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

  database.query('UPDATE user SET last_login = ? WHERE user_id = ?', [currentDate, userId])
  .then(rows => true)
  .catch(err => console.error(err))
}

// =========================================================================
// LOCAL SIGNUP ============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'

passport.use('local-signup', new LocalStrategy({
  // by default, local strategy uses username and password, we will override with email
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true // allows us to pass back the entire request to the callback
}, (req, email, password, done) => {
  console.log(req.body, email, password)

  const { salutation, firstname, lastname } = req.body;

  const trimmedSalutation = salutation && salutation.trim()
  const trimmedFirstname = firstname && firstname.trim()
  const trimmedLastname = lastname && lastname.trim()

  if(!trimmedSalutation || trimmedSalutation.length === 0){
    return done(null, false, req.flash('signupMessage', 'No Salutation'));
  }

  if(!trimmedFirstname || trimmedFirstname.length === 0){
    return done(null, false, req.flash('signupMessage', 'No Firstname'));
  }

  if(!trimmedLastname || trimmedLastname.length === 0){
    return done(null, false, req.flash('signupMessage', 'No Lastname'));
  }

  database.query("SELECT * FROM v_user WHERE email = ?", [email]).then(rows => {
    if (rows.length) {
      return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
    } else {
      // if there is no user with that email
      // create the user
      const newUserMysql = {
        salutation_id: trimmedSalutation,
        firstname: trimmedFirstname,
        lastname: trimmedLastname,
        email: email,
        password: bcrypt.hashSync(password, null, null), // use the generateHash function in our user model
        last_login: new Date().toISOString().slice(0, 19).replace('T', ' '),
        userpermission_id: 1
      };

      const insertQuery = "INSERT INTO user ( salutation_id, firstname, lastname, email, password, last_login ) values (?,?,?,?,?,?)";

      database.query(insertQuery, [
        newUserMysql.salutation_id,
        newUserMysql.firstname,
        newUserMysql.lastname,
        newUserMysql.email,
        newUserMysql.password,
        newUserMysql.last_login,
      ]).then(rows => {
        newUserMysql.user_id = rows.insertId;
        return done(null, newUserMysql);
      }).catch(err => done(null, newUserMysql));
    }
  }).catch(err => done(err))
}));

// =========================================================================
// LOCAL LOGIN =============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'

passport.use('local-login', new LocalStrategy({
  // by default, local strategy uses username and password, we will override with email
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true // allows us to pass back the entire request to the callback
}, (req, email, password, done) => { // callback with email and password from our form
  database.query("SELECT * FROM v_user WHERE email = ?", [email])
  .then(rows => {
    if (!rows.length)
      return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

    // If user has userstate to blocked
    if(rows[0].userstate_id === 2)
      return done(null, false, req.flash('loginMessage', 'You have no acces contact the website administrator')); // req.flash is the way to set flashdata using connect-flash

    // if the user is found but the password is wrong
    if (!bcrypt.compareSync(password, rows[0].password))
      return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

    // update lastlogin
    updateLastLogin(rows[0].user_id)

    // all is well, return successful user
    return done(null, rows[0]);
  })
  .catch(err => done(err))
}));

module.exports = passport;
