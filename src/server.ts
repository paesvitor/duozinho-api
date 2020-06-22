require("dotenv").config();
import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import routes from "./routes";
import bodyParser from "body-parser";

const connection = createConnection()
  .then(async (connection) => {
    const app = express();
    app.use(bodyParser.json());
    app.use(routes);
    app.listen(3000);
  })
  .catch((error) => console.log(error));

export default connection;
