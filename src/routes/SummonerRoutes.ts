import express from "express";
import { UserController } from "@controllers/UserController";
import { PhotoController } from "@controllers/PhotoController";
import { RiotGamesController } from "@controllers/RiotGamesController";
import { authMiddleware } from "@middlewares/authMiddleware";

const router = express.Router();

router.post("/create", authMiddleware, RiotGamesController.create);
router.post("/verify", authMiddleware, RiotGamesController.verify);

export default router;
