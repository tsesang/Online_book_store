const mongoose = require("mongoose");
const express = require('express');
const app = express();

const session = require('express-session');
const cookieParser = require('cookie-parser')

// const session = require('express-session');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
const path = require('path');

const fileUpload = require('express-fileupload')
app.use(fileUpload())
// enctype="multipart/form-data" tis line should be included in the form tag in ejs 


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.urlencoded({ extended: true }));

//middlewares for session management

app.use(cookieParser())
const sessionVar = {secret : "we know nothing"}
app.use(session(sessionVar))


//middlewares for FORMS
app.use(express.json())
app.use(express.urlencoded({extended : true}))

const route = require('./routes/users')
app.use(route);

// app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// const  users = [];

// // Passport configuration
// passport.use(new LocalStrategy((username, password, done) => {
//   const user = users.find(u => u.username === username && u.password === password);
//   if (user) {
//     return done(null, user);
//   } else {
//     return done(null, false, { message: 'Incorrect username or password' });
//   }
// }));

// passport.serializeUser((user, done) => {
//   done(null, user.username);
// // });

// passport.deserializeUser((username, done) => {
//   const user = users.find(u => u.username === username);
//   done(null, user);
// });


// connecting database
mongoose
  .connect("mongodb://127.0.0.1:27017/Book", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected Successfully!!!");
  })
  .catch((err) => {
    console.error("Error occurred:", err);
  });





app.listen(3005,()=>{
  console.log("you server started noob !!! :   http://localhost:3005/")
})

module.exports = app;
