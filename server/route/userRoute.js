import express from "express";
import {
  createAUser,
  deleteUser,
  getAllUser,
  getAUser,
  loginUser,
  updateUser,
} from "../controller/user/controller.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { authenticateUser } from "../middleware/authentication.js";

const router = express.Router();

const route = (app) => {
  router.get("/allUsers", asyncHandler(getAllUser));
  router.get(
    "/getAUser",
    asyncHandler(authenticateUser),
    asyncHandler(getAUser)
  );
  router.post("/createAUser", asyncHandler(createAUser));
  router.put("/updateUser", asyncHandler(updateUser));
  router.delete("/deleteAUser", asyncHandler(deleteUser));
  router.post("/login", asyncHandler(loginUser));
  return app.use("/api/v1/user", router);
};

export default route;
