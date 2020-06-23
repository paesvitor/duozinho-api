import express from "express";
import { PhotoController } from "@controllers/PhotoController";
import { authMiddleware } from "@middlewares/authMiddleware";
import { OpController } from "@controllers/OpController";

const router = express.Router();

router.post("/", authMiddleware, OpController.create);

export default router;
