import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
const helmet = require("helmet");

import router from "./api/routes";

const app = express();
const port = process.env.PORT || 5000;

const baseApp = `/api/v1`;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  })
);
app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use(`${baseApp}`, router);

app.get("/hi", (req, res) => {
  res.status(200).send("hi");
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

export default app;
