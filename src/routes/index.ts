import express from "express";
import UserRoutes from "./UserRoutes";
import AuthRoutes from "./AuthRoutes";
import PhotoRoutes from "./PhotoRoutes";
import SummonerRoutes from "./SummonerRoutes";
const router = express.Router();

router.use("/users", UserRoutes);
router.use("/auth", AuthRoutes);
router.use("/photos", PhotoRoutes);
router.use("/summoners", SummonerRoutes);

export default router;
