import express from 'express';
import apiRouter from './api/index';

const allRoutes = express.Router();

allRoutes.get('/', (req, res) => {
  res.json({ message: 'Welcome to barefoot!' });
});

allRoutes.use('/api/v1', apiRouter);

export default allRoutes;
