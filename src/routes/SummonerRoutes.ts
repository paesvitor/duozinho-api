import express from "express";
import { RiotGamesController } from "@controllers/RiotGamesController";
import { authMiddleware } from "@middlewares/authMiddleware";

const router = express.Router();

router.post("/create", authMiddleware, RiotGamesController.create);
router.post("/verify", authMiddleware, RiotGamesController.verify);

export default router;
