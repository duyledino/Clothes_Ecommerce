import express from "express";
import {
  addToCart,
  clearCart,
  getCart,
  removeAnItem,
} from "../controller/cart/controller.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { authenticateUser } from "../middleware/authentication.js";

const router = express.Router();

const route = (app) => {
  //this route will get cart from a user
  router.get("/getCart", asyncHandler(getCart));
  // this route will add item to cart
  router.post("/addToCart", asyncHandler(addToCart));
  // this route will clear all item in cart
  router.delete("/clearCart", asyncHandler(clearCart));
  // this route will remove an item in cart
  router.delete("/removeOneItemCart",asyncHandler(authenticateUser) ,asyncHandler(removeAnItem));
  return app.use("/api/v1/cart", router);
};

export default route;
