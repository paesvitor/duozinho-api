import express from "express";
import { User } from "@entities/User";

const app = express();

app.get("/", (req, res) => {
  const user = new User();

  user.email = "mail";

  return res.json({ message: "Hello world" });
});

app.listen(3000);
