import { Router } from "express";
import userRouter from "./userRouter";
import sessionRouter from "./sessionRouter";
import adRouter from "./adRouter";
import favoriteRouter from "./favoriteRouter";

const router = Router();

router.use("/user", userRouter);
router.use("/session", sessionRouter);
router.use("/ad", adRouter);
router.use("/fav", favoriteRouter);

export default router;
