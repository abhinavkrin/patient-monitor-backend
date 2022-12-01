import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import * as admin from 'firebase-admin';
import devicesRouter from './routes/devices';
import readingsRouter from './routes/readings';
var indexRouter = require('./routes/index');
var app = express();

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/devices', devicesRouter)
app.use('/readings', readingsRouter)
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createHttpError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  res.statusCode = err.statusCode || 500;
  res.json({
    msg: 
      err instanceof createHttpError.HttpError  
      ? err.message : 'Unknown error'
  })
});

module.exports = app;
