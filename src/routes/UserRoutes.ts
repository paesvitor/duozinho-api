import express from "express";
import { UserController } from "src/controllers/UserController";
import { PhotoController } from "@controllers/PhotoController";
import { RiotGamesController } from "@controllers/RiotGamesController";

const router = express.Router();

router.get("/", UserController.list);
router.post("/", UserController.save);
router.get("/:userId", UserController.show);
router.patch("/", UserController.update);

// Actions
router.get("/:userId/photos", PhotoController.list);
router.post("/:userId/photos", PhotoController.save);
router.post("/summoner/register", RiotGamesController.create);
router.post("/summoner/verify", RiotGamesController.verify);

export default router;
