import express from 'express';
import { approveEbmClaimRequest, createEbmClaimRequest, getAllEbmClaimRequests } from '../../controllers/ebmClaimRequestController';

import { protect } from '../../controllers/authentication';

const ebmClaimsRouter = express.Router();

ebmClaimsRouter.post('', protect, createEbmClaimRequest);
ebmClaimsRouter.get('', protect, getAllEbmClaimRequests);
ebmClaimsRouter.patch('/approve/:id', protect, approveEbmClaimRequest);



export default ebmClaimsRouter;  
export  default ebmClaimsRouter;