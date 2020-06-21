import express from "express";
import UserRoutes from "./UserRoutes";
const router = express.Router();

router.use("/users", UserRoutes);

export default router;
