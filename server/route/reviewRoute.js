import express from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { authenticateUser } from "../middleware/authentication.js";
import {
  getReviewByProduct,
  createAReviewByUser,
  updateAReviewByUser,
  deleteAReviewByUser,
} from "../controller/review/controller.js";

const router = express.Router();

const init = (app) => {
  router.get("/getReviewByProduct", asyncHandler(getReviewByProduct)); // get by product id in req.query
  router.post(
    "/createAReviewByUser",
    asyncHandler(authenticateUser),
    asyncHandler(createAReviewByUser)
  ); //user create review by passing userid in req.query
  router.put(
    "/updateAReviewByUser",
    asyncHandler(authenticateUser),
    asyncHandler(updateAReviewByUser)
  ); //user update review by passing userid,productId in req.query
  router.delete(
    "/deleteAReviewByUser",
    asyncHandler(authenticateUser),
    asyncHandler(deleteAReviewByUser)
  ); //user delete review by passing productId in req.query
  return app.use("/api/v1/review", router);
};

export default init;
