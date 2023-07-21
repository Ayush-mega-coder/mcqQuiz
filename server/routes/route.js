// backend/routes/route.js

import express from 'express';
import {  signupUser,homePage,isAdmin,fetchUsers} from '../controller/user-controller.js';
import passport from "passport"; // Import passport here
import { createQuestion } from '../controller/question-controller.js';

const router = express.Router();

router.get('/home', isAdmin,homePage);
// router.get('/', homePage);
router.post('/signup', signupUser);
router.post('/api/questions',createQuestion)
router.get('/users',fetchUsers)


// Use passport.authenticate for login route
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ name: user.name, username: user.username, role: user.role });
    });
  })(req, res, next);
});


export default router;
