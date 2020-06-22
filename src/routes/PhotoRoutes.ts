import express from "express";
import { UserController } from "@controllers/UserController";
import { PhotoController } from "@controllers/PhotoController";
import { RiotGamesController } from "@controllers/RiotGamesController";
import { authMiddleware } from "@middlewares/authMiddleware";

const router = express.Router();

// Actions
router.get("/", authMiddleware, PhotoController.list);
router.post("/", authMiddleware, PhotoController.create);

export default router;
