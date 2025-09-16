import express from "express";
import { upload } from "../config/multer.js";
import {
  createAProduct,
  deleteProduct,
  findProduct,
  getAllProducts,
  getAllProductsAdmin,
  getBestSeller,
  getLastestProduct,
  getProductById,
  getTotalPage,
  reviseProduct,
} from "../controller/product/controller.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import {
  authenticateAdmin,
  authenticateUser,
} from "../middleware/authentication.js";

const router = express.Router();

const route = (app) => {
  router.post("/allProducts", asyncHandler(getAllProducts));
  router.get("/lastestProducts", asyncHandler(getLastestProduct));
  router.get("/bestSellerProducts", asyncHandler(getBestSeller));
  router.get(
    "/allProductsAdmin",
    asyncHandler(authenticateUser),
    asyncHandler(authenticateAdmin),
    asyncHandler(getAllProductsAdmin)
  );
  router.post("/getTotalPage", asyncHandler(getTotalPage));
  router.post(
    "/createAProduct",
    asyncHandler(authenticateUser),
    upload.array("photos", 12),
    asyncHandler(createAProduct)
  );
  router.put(
    "/reviseProduct",
    asyncHandler(authenticateUser),
    asyncHandler(authenticateAdmin),
    asyncHandler(reviseProduct)
  );
  router.delete(
    "/deleteProduct",
    asyncHandler(authenticateUser),
    asyncHandler(authenticateAdmin),
    asyncHandler(deleteProduct)
  );
  router.get("/findProduct", asyncHandler(findProduct));
  router.get("/getProductById", asyncHandler(getProductById));
  //Can add delete multiple
  return app.use("/api/v1/product", router);
};

export default route;
