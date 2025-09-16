import express from 'express'
import { asyncHandler } from '../middleware/asyncHandler.js';
import { getTryOn, getTryOnUsingImage } from '../controller/tryon/controller.js';
import { upload } from '../config/multer.js';

const router = express.Router();

const init = (app)=>{
    router.post('/uploadCLothes',upload.array("photos",12),asyncHandler(getTryOnUsingImage));
    return app.use("/api/v1/tryon",router);
}

export default init;