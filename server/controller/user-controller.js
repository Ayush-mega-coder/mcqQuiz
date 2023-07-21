// backend/controller/auth.js

// ... (Existing code)

import passport from "passport";
import bcrypt from "bcrypt";
import User from "../model/user.js";
import { Strategy as LocalStrategy } from "passport-local";

// Passport Local Strategy for username-password authentication
passport.use(
  new LocalStrategy(
    { usernameField: "username" },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Middleware to check if a user is authenticated
export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

// Middleware to check if a user has admin privileges
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  res.status(403).json({ message: "Forbidden" });
};
export const signupUser = async (request, response) => {
    try {
        console.log(request.body)
        const hashedPassword = await bcrypt.hash(request.body.password,10)
        const user = { username: request.body.username, name: request.body.name, password: hashedPassword,role:request.body.role };

        const newUser = new User(user);
        await newUser.save();

        return response.status(200).json({ msg: 'Signup successful' });
    } catch (error) {
        console.error('Error in signupUser:', error);
        return response.status(500).json({ msg: 'Error while signing up user' });
    }
};
export const fetchUsers = async (request,response)=>{
  try{
    // const user = await User.find(state:{$ne:"admin"} , 'name')
    const users = await User.find({ state: { $ne: 'admin' } }, 'name');
    response.json(users)


  } catch(error){
    console.log("Error while fetching the users")
    response.state(500).json({msg:"server error"})
  }
}
export const homePage = async (request,response)=>{
  try{
      let nameObj={
          
              myName:'ayush',
              myPos:'MERN stack'
      }
      response.json(nameObj);

      
  } catch(error){
      console.log("error found",error);
      response.status(500).json({message:"server error"})
  }
}