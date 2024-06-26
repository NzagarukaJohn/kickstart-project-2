import express from 'express';
import userRouter from './users';
import swaggerRouter from './swagger.js';
import authRouter from './authentication';
import ebmClaimsRouter from './ebmClaims.routes.js';

const apiRouter = express.Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/user/auth', authRouter);
apiRouter.use('/docs', swaggerRouter);
apiRouter.use('/ebm-claims', ebmClaimsRouter);
// apiRouter.use('/trip-request',tripRequest);

export default apiRouter;
