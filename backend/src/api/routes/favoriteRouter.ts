import { Request, Response } from "express";
import { Router } from "express";
import favoriteService from "../services/favoriteService";

const favoriteRouter = Router();

favoriteRouter.post("/create", async (req: Request, res: Response) => {
  const result = await favoriteService.create(req.body);
  if (result) return res.status(200).send(result);
  else return res.status(400).send(false);
});

favoriteRouter.delete("/delete/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await favoriteService.deleteById(id);
  if (result) return res.status(200).send(result);
  else return res.status(400).send(false);
});

export default favoriteRouter;
