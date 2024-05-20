import express, { Request, Response } from "express";
import { Router } from "express";
import userService from "../services/userService";
import { CreatedAt, UpdatedAt } from "sequelize-typescript";
import dataFormat from "../../utils/dataFormat";

const userRouter = Router();

userRouter.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await userService.getById(id);
  return res.status(200).send({
    name: result.name,
    email: result.email,
    createdAt: dataFormat(result.createdAt),
    updatedAt: dataFormat(result.updatedAt),
  });
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
