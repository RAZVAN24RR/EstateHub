import express, { Request, Response } from "express";
import { Router } from "express";
import userService from "../services/userService";
import { CreatedAt, UpdatedAt } from "sequelize-typescript";
import dataFormat from "../../utils/dataFormat";
import { decodeAndVerifyJWT } from "../../utils/decodeJWT";

const userRouter = Router();

userRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = Number(decodeAndVerifyJWT(req.params.id));
  const result = await userService.getById(id);
  return res.status(200).send({
    name: result.name,
    email: result.email,
    createdAt: dataFormat(result.createdAt),
    updatedAt: dataFormat(result.updatedAt),
    isAdmin: result.isAdmin,
  });
});
userRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = decodeAndVerifyJWT(req.params.id);
  const isDeleted = await userService.deleteById(id);
  return isDeleted;
});
userRouter.post("/createUser", async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await userService.create(req.body);
  return res.status(200).send(result);
});
userRouter.post("/createUserAdmin", async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await userService.createAdmin(req.body);
  return res.status(200).send(result);
});

export default userRouter;
