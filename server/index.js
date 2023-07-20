// src/app.ts
import express from 'express';
import Connection from "./database/db.js";
import dotenv from 'dotenv';
import Router from './routes/route.js';
import cors from 'cors'
dotenv.config();

const app = express()
app.use(cors());     
app.use(express.json());
// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

const PORT = 8000
app.use('/',Router)
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);
app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
} )