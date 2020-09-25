import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index';
import path from 'path';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/v1', indexRouter);

console.log('path', path.join(__dirname));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname), '../build/index.html');
});

export default app;
