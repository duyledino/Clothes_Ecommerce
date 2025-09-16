import express from 'express'
import { createPaymentUrl } from '../controller/payment/controller.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

const route = (app)=>{
    router.post("/createPayment",asyncHandler(createPaymentUrl));
    return app.use("/api/v1/payment",router);
}

export default route;