// src/app.ts

import express from 'express';
import Connection from "./database/db.js";
import dotenv from 'dotenv';
import Router from './routes/route.js';
import cors from 'cors'
import passport from "passport"; 
import session from 'express-session'; 
dotenv.config();

const app = express()
app.use(cors());     
app.use(express.json());

const PORT = 8000

// Initialize express-session middleware before passport.session()
app.use(
    session({
      secret: "your-secret-key", // Replace with your own secret key
      resave: false,
      saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Register routes after passport middleware
app.use('/', Router)
// app.use('/user', userRouter)
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
