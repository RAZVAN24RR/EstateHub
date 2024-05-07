import express, { Request, Response } from "express";
import SessionController from "../controllers/sessionController";
const sessionRouter = express.Router();

sessionRouter.post("/", SessionController.createSession);

export default sessionRouter;
