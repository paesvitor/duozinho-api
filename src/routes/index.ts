import express from "express";
import UserRoutes from "./UserRoutes";
import AuthRoutes from "./AuthRoutes";
import PhotoRoutes from "./PhotoRoutes";
import SummonerRoutes from "./SummonerRoutes";
import OpRoutes from "./OpRoutes";

const router = express.Router();

router.use("/users", UserRoutes);
router.use("/auth", AuthRoutes);
router.use("/photos", PhotoRoutes);
router.use("/summoners", SummonerRoutes);
router.use("/op", OpRoutes);

export default router;
