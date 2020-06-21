import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "@entities/User";

export class UserController {
  static async list(req: Request, res: Response) {
    try {
      const users = await getRepository(User).find();

      return res.send({ users });
    } catch (error) {
      return res.status(400).send({ deu: "ruim" });
    }
  }

  static async save(req: Request, res: Response) {
    try {
      const repository = await getRepository(User);

      const user = await repository.create(req.body);
      const result = await repository.save(user);

      return res.send({ user: result });
    } catch (error) {
      return res.status(400).send({ error });
    }
  }
}
