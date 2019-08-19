// config/passport.js
const passport = require('passport')
const bcrypt = require('bcrypt')
// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
const gqlconnect = require('./gqlConnect');
// expose this function to our app using module.exports

// =========================================================================
// passport session setup ==================================================
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// used to serialize the user for the session
passport.serializeUser((user, done) => {
  done(null, user.data.getAddress.nodes[0].address_id)
});

// used to deserialize the user
passport.deserializeUser(async (id, done) => {
  const getUserById= {
    query: `query($address_id: ID!){
      getAddress(input: {address_id: $address_id}){
        nodes{
          address_id
          email
        }
        totalCount      
      }
    }`,
    variables: { address_id: id }
  }

  try{
    const user = await gqlconnect('/netliveprivate', getUserById);
    return done(null, user.data.getAddress.nodes[0])
  }catch (e) {
    return done(e,null)
  }
});

//Function to update last_login
const updateLastLogin = async userId => {
  console.log("userId", userId)
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

  database.query('UPDATE user SET last_login = ? WHERE user_id = ?', [currentDate, userId])
  .then(rows => true)
  .catch(err => console.error(err))
}

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
}, async (req, email, password, done) => { // callback with email and password from our form

  const getUserQuery = {
    query: `query($email: String!){
      getAddress(input: {email: $email}){
        nodes{
          address_id
          email
          password
        }
        totalCount      
      }
    }`,
    variables: { email }
  }

  try{
    const user = await gqlconnect('/netliveprivate', getUserQuery);
    const userFound = !!user.data.getAddress.totalCount

    if(!userFound){
      return done(null, false, {message: "User not Found"});
    }
  
    const dbPassword = user.data.getAddress.nodes[0].password;
    const userId = user.data.getAddress.nodes[0].address_id
  
    if (!bcrypt.compareSync(password, dbPassword))
      return done(null, false, {message: "Wrong password"}); // create the loginMessage and save it to session as flashdata
    
    //updateLastLogin(userId) // TODO: Update Date doesnt work

    return done(null, user);
  } catch (e) {
    return done(e,null)
  }  
}));

module.exports = passport;
