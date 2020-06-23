import express from "express";
import { UserController } from "@controllers/UserController";
import { authMiddleware } from "@middlewares/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, UserController.list);
router.get("/:userId", authMiddleware, UserController.show);
router.post("/", UserController.create);
router.patch("/", authMiddleware, UserController.update);

export default router;
