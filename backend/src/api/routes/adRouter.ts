import express, { Request, Response } from "express";
import { Router } from "express";
import { create } from "../../db/dal/user";
import adService from "../services/adSevice";

const adRouter = Router();

adRouter.post("/createAd", async (req: Request, res: Response) => {
  const result = await adService.create(req.body);
  if (result) return res.status(200).send(result);
  else return res.status(400).send(false);
});

adRouter.get("/ads", async (req: Request, res: Response) => {
  const result = await adService.getAllAds();
  if (result) return res.status(200).send(result);
  else return res.status(400).send(false);
});

adRouter.delete("/deleteAd/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const isDeleted = await adService.deleteAdByid(id);
  if (isDeleted) return res.status(200).send(true);
  else return res.status(400).send(false);
});

adRouter.get("/getAdById/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const response = await adService.getAdByid(id);
  if (response) return res.status(200).send(response);
  else return res.status(400).send(false);
});

adRouter.get("/getAdByName/:name", async (req: Request, res: Response) => {
  const name = req.params.name;
  const response = await adService.getAdsByName(name);
  if (response) return res.status(200).send(response);
  else return res.status(400).send(false);
});

export default adRouter;
