import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import db from './configs/mongooseConfig.js';
import bodyParser from 'body-parser';

const app = express();

const PORT = 5000;

app.use(bodyParser.json())

//db connection
db();

app.listen(PORT, () => {
  console.log(`There server is up and running on ${PORT}`)
});