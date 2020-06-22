import express from "express";
import UserRoutes from "./UserRoutes";
import AuthRoutes from "./AuthRoutes";
const router = express.Router();

router.use("/users", UserRoutes);
router.use("/auth", AuthRoutes);

export default router;
