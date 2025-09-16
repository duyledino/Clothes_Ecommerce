import express from "express";
import {
  getRevenue,
  bestCustomer,
  bestSeller,
} from "../controller/track/controller.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = express.Router();

const init = (app) => {
  router.get("/revenue", asyncHandler(getRevenue));
  router.get("/bestCustomer", asyncHandler(bestCustomer));
  router.get("/bestSeller", asyncHandler(bestSeller));
  return app.use("/api/v1/track",router);
};

export default init;
