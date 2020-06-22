import express from "express";
import { UserController } from "@controllers/UserController";
import { PhotoController } from "@controllers/PhotoController";
import { RiotGamesController } from "@controllers/RiotGamesController";
import { authMiddleware } from "@middlewares/authMiddleware";

const router = express.Router();

router.get("/:userId", authMiddleware, UserController.show);
router.get("/", authMiddleware, UserController.list);
router.post("/", authMiddleware, UserController.save);
router.patch("/", authMiddleware, UserController.update);

// Actions
router.get("/:userId/photos", authMiddleware, PhotoController.list);
router.post("/:userId/photos", authMiddleware, PhotoController.save);
router.post("/register", authMiddleware, RiotGamesController.create);
router.post("/verify", authMiddleware, RiotGamesController.verify);

export default router;
