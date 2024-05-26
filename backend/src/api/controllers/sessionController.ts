import express, { Request, Response } from "express";
const { StatusCodes } = require("http-status-codes");
const SessionService = require("../services/sessionService");

const createSession = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await SessionService.createSession(email, password);
  if (token) {
    res.status(StatusCodes.ACCEPTED).send(token);
  } else {
    res.status(StatusCodes.ACCEPTED).send(false);
  }
};

const SessionController = {
  createSession,
};
export default SessionController;
