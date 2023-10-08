import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import db from './configs/mongooseConfig.js';
import bodyParser from 'body-parser';
import user_router from './routes/user.js';
import cookieParser from 'cookie-parser';
import material_router from './routes/material.js';
import manager_router from './routes/manager-router.js';
import constructionsite_router from './routes/construction-site-router.js';

const app = express();

const PORT = 5050;

app.use(bodyParser.json())
app.use(cookieParser());
app.use('/api/user', user_router);
app.use('/api/material', material_router);
app.use('/manager', manager_router);
app.use('/constructionsite', constructionsite_router);


//db connection
db();

app.listen(PORT, () => {
  console.log(`The server is up and running on ${PORT}`)
});