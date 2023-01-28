const User = require("../model/user.model");
const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy(
     async (username, password, done) => {
     try {
        const user = await User.findOne({ username: username });
        if (!user) { 
            return done(null, false,{message:"Incorrect username"});
    }
        if(!bcrypt.compare(password,user.password)){
            return done(null, false,{message:"Incorrect password"});
     }

     } catch (error) {
        return done(err);
     }}
  ));

  //serialize id
  passport.serializeUser((user,done)=>{
     done(null,user.id);
  });

  //deserialize id

  passport.deserializeUser(async(id,done)=>{
    try {
        const user = await User.findById(id);
        done(null,user);
    } catch (error) {
        done(error,false)
    }
  })