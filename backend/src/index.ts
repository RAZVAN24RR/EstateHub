import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import router from "./api/routes";

const app = express();
const port = 5000;
const baseApp = `/api/v1`;

app.use(cors());
app.use(bodyParser.json());

app.use(`${baseApp}`, router);

app.get("/hi", (req, res) => {
  res.status(200).send("hi");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
