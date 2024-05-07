import express, { Request, Response } from "express";
import { Router } from "express";
import userService from "../services/userService";

const userRouter = Router();

userRouter.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await userService.getById(id);
  return res.status(200).send(result);
});
userRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const isDeleted = await userService.deleteById(id);
  return isDeleted;
});
userRouter.post("/createUser", async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await userService.create(req.body);
  return res.status(200).send(result);
});

export default userRouter;
