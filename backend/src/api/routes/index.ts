import { Router } from "express";
import userRouter from "./userRouter";
import sessionRouter from "./sessionRouter";

const router = Router();

router.use("/user", userRouter);
router.use("/session", sessionRouter);

export default router;
