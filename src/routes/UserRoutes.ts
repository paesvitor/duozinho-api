import express from "express";
import { UserController } from "src/controllers/UserController";

const router = express.Router();

router.get("/", UserController.list);
router.post("/", UserController.save);

export default router;
